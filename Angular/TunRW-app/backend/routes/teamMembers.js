const express = require("express");
const checkAuth = require('../middleware/check-auth');
const teamMemberController = require("../controller/teamMembers");
const router = express.Router();

router.post("", checkAuth, teamMemberController.createTeamMember);

router.get('', teamMemberController.getAllTeamMembers);

router.get('/:id',  teamMemberController.getOneTeamMember);

router.put('/:id', checkAuth, teamMemberController.updateTeamMember);

router.delete('/:id',checkAuth, teamMemberController.deleteTeamMember);

module.exports = router;
