var digo = require("digo");

module.exports = {

	load: true,

	end: function (files, options, result) {

		// 格式化参数。
		if (typeof options === "string") {
			options = { path: options };
		} else {
			options = Object.assign({}, options);
		}
		if (options.seperator == undefined) {
			options.seperator = "\n";
		}

		// 排序。
		if (options.sort) {
			files = files.slice(0);
			files.sort(options.sort);
		}

		var resultFile = new digo.File();
		resultFile.path = options.path || (files[0] ? digo.getFileName(files[0].dir) + files[0].ext : "concat");
		var writer = resultFile.createWriter();

		if (options.prepend) {
			writer.write(typeof options.prepend === "function" ? options.prepend() : options.prepend);
		}

		for (var i = 0; i < files.length; i++) {
			var file = files[i];

			if (i && options.seperator) {
				writer.write(typeof options.seperator === "function" ? options.seperator(file, i) : options.seperator);
			}

			if (options.prependEach) {
				writer.write(typeof options.prependEach === "function" ? options.prependEach(file, i) : options.prependEach);
			}

			if (typeof options.content === "function") {
				writer.write(options.content(file, i));
			} else {
				writer.writeFile(file);
			}

			if (options.appendEach) {
				writer.write(typeof options.appendEach === "function" ? options.appendEach(file, i) : options.appendEach);
			}

		}

		if (options.append) {
			writer.write(typeof options.append === "function" ? options.append() : options.append);
		}

		writer.end();
		result.add(resultFile);
	}

};
