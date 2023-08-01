import express from 'express';
const router = express.Router();

import studentApi from './api/students.api';
router.use("/students", studentApi);

export default router;