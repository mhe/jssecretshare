////////////////////////////////////////////////////////////////////////////////////
//
// shamir.js: A re-implementation of VIFF's implementation of Shamir's
// Secret Sharing scheme
// 
// Author: Maarten H. Everts (TNO)
//
// Dependencies: jsbn, from http://www-cs-students.stanford.edu/~tjw/jsbn/
//  (you will need at least jsbn.js, jsbn2.js, prng4.js, and rng.js).
//
////////////////////////////////////////////////////////////////////////////////////

secretshare = {
	//The *threshold* indicates the maximum number of shares that reveal
    //nothing about *secret*. The return value is a list of ``[player
    // id, share]`` pairs.
	share: function(secret, modulus, threshold, numPlayers) {
		secret = typeof secret === 'number' ? nbv(secret) : secret;
		modulus = typeof modulus === 'number' ? nbv(modulus) : modulus;
		modulus = typeof modulus === 'string' ? new BigInteger(modulus) : modulus;
		// Produce threshold random coeficients
		var bitLength = modulus.bitLength(), coeficients = [secret], shares = [], rng = new SecureRandom();
		for (var i = 0; i < threshold; i++) {
			var c;
			do {
				c = new BigInteger(bitLength,rng);
			} while(c.compareTo(modulus) >= 0);
			coeficients.push(c);
		}
		// Generate the shares
		for (var i = 1; i < numPlayers + 1; i++) {
			// The following is from the VIFF source code:
			// Instead of calculating s_i as
        	//   s_i = s + a_1 x_i + a_2 x_i^2 + ... + a_t x_i^t
        	//
        	// we avoid the exponentiations by calculating s_i by
        	//
        	//   s_i = s + x_i (a_1 + x_i (a_2 + x_i ( ... (a_t) ... )))
        	//
        	// This is a little faster, even for small n and t.

			var curPoint = nbv(i), curShare = coeficients[threshold];
			for (var j = threshold - 1; j > -1; j--) {
				curShare = curShare.multiply(curPoint).add(coeficients[j]).mod(modulus);
			}
			shares.push([curPoint,curShare])
		}
		return shares;
	},
	recombine: function(shares, modulus, xRecomb) {
		xRecomb = typeof xRecomb !== 'undefined' ? a : BigInteger.ZERO;
		modulus = typeof modulus === 'number' ? nbv(modulus) : modulus;
		modulus = typeof modulus === 'string' ? new BigInteger(modulus) : modulus;
		var sum = BigInteger.ZERO;

		for (var i = 0; i < shares.length; i++) {
			var factor = BigInteger.ONE;
			x_i = shares[i][0];
			for (var k = 0; k < shares.length; k++) {
				x_k = shares[k][0];
				if (i !== k && x_k.compareTo(x_i) !== 0) {
					f = x_k.subtract(xRecomb).mod(modulus).multiply(x_k.subtract(x_i).mod(modulus).modInverse(modulus)).mod(modulus);
					factor = factor.multiply(f).mod(modulus);
				}
			};
			sum = sum.add(factor.multiply(shares[i][1])).mod(modulus);
		};
		return sum;
	}
}
