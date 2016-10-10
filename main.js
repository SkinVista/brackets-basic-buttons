/* Brackets Basic-Buttons Extension */

define(function (require, exports, module) {
	'use strict';

	//console.log("Starting Basic-Buttons Extension");

	var ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
	var CommandManager = brackets.getModule("command/CommandManager");
	var CustomButtom   = require("./custom");

	ExtensionUtils.loadStyleSheet(module, "basicbuttons.css");

	var toolbarSaveButton = $(document.createElement("a"))
		.attr("id", "save-button")
		.attr("href", "#")
		.attr("title", "Save All")
		.on("click", function () {
			CommandManager.execute("file.saveAll");
		})
		.on("contextmenu", function () {
			CommandManager.execute("file.save");
		})
		.appendTo($("#main-toolbar .buttons"));

	var toolbarUndoButton = $(document.createElement("a"))
		.attr("id", "undo-button")
		.attr("href", "#")
		.attr("title", "Undo/Redo (Right-click)")
		.on("click", function () {
			CommandManager.execute("edit.undo");
		})
		.on("contextmenu", function () {
			CommandManager.execute("edit.redo");
		})
		.appendTo($("#main-toolbar .buttons"));
	
	if (CUSTOM_COMMAND && CUSTOM_COMMAND != "none") {

	const CustomPath = ExtensionUtils.getModulePath(module) + "custom.js";

	var toolbarCustomButton = $(document.createElement("a"))
		.attr("id", "custom-button")
		.attr("href", "#")
		.attr("title", CUSTOM_COMMAND)
		.on("click", function () {
			if (CUSTOM_COMMAND == "change.this" || CUSTOM_COMMAND.indexOf('.') < 3)
				CommandManager.execute("cmd.addToWorkingSetAndOpen", {fullPath: CustomPath});
			else
				CommandManager.execute(CUSTOM_COMMAND);
		})
		.on("contextmenu", function () {
			CommandManager.execute("cmd.addToWorkingSetAndOpen", {fullPath: CustomPath});
		})
		.appendTo($("#main-toolbar .buttons"));
		//toolbarCustomButton.css("background-position", "0 0");

	}

	console.log("Loaded Basic-Buttons Extension");
});
