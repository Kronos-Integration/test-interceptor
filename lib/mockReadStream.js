/* global describe, it, beforeEach */
/* jslint node: true, esnext: true */

'use strict';

const stream = require('stream');

/**
 * Simulates a dummy readable stream.
 *
 * // Stores the result of the filter
 * let lines = [];
 *
 * const dummyStream = mockReadStreamFactory();
 * dummyStream.add({"name": "Matt"});
 * dummyStream.add({"last_name": "Herbert"});
 * const filter = streamConsumer(opts);
 * dummyStream.pipe(filter).on('data', function (line) {
 *		 lines.push(line);
 *	 })
 *	 .on('error', function (err) {
 *		 verifyFunction(err, lines);
 *	 })
 *	 .on('header', function (header) {
 *		 //console.log(header);
 *	 })
 *  .on('end', function () {
 *		 verifyFunction(false, lines);
 *	 });

 */

class MockReadStream extends stream.Readable {
	constructor() {
		super({
			objectMode: true,
			highWaterMark: 16
		});

		// Stores the objects to be readable
		this.objectStack = [];
	}

	add(obj) {
		if (Array.isArray(obj)) {
			this.objectStack = obj;
		} else {
			this.objectStack.push(obj);
		}
	}

	_read() {
		if (this.objectStack.length > 0) {
			this.push(this.objectStack.shift());
		} else {
			this.push(null);
		}
	}
}
module.exports = function () {
	return new MockReadStream();
};
