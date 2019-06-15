const express = require("express");
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
const projectController = require("../controller/projects");
const router = express.Router();

router.post("", checkAuth, extractFile,projectController.createProject);

router.get('', projectController.getAllProjects);

router.get('/:id', extractFile, projectController.getOneProject);

router.put('/:id', extractFile, projectController.updateProject);

router.delete('/:id', projectController.deleteProject);

module.exports = router;
