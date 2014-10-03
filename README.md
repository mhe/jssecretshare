jssecretshare
=============

jssecretshare is a simple proof-of-concept Javascript implementation of [Shamir's Secret Sharing](http://en.wikipedia.org/wiki/Shamir's_Secret_Sharing) scheme. It was specifically designed to interact well with the implementation of Shamir's Secret Sharing scheme found in [VIFF](http://viff.dk).

Do keep in mind this is proof-of-concept code. Also, doing cryptography in Javascript is typically considered to be a Bad Idea (tm), see also the discussion ["Javascript Cryptography Considered Harmful"](http://www.matasano.com/articles/javascript-cryptography/).

Dependencies
------------

jssecretshare has a single dependency: [jsbn](http://www-cs-students.stanford.edu/~tjw/jsbn/).
You will need at least jsbn.js, jsbn2.js, prng4.js, and rng.js

Acknowledgements
----------------

A large part of the work on this library was done at [TNO](http://www.tno.nl) in a project supported by the ["COMMIT/"](http://www.commit-nl.nl) program.
