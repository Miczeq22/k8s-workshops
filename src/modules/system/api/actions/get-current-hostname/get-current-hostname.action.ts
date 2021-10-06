import { RequestHandler } from 'express';

/**
 * @swagger
 *
 * /system/hostname:
 *   get:
 *     tags:
 *       - System
 *     security:
 *       - bearerAuth: []
 *     summary: Checks current hostname
 *     responses:
 *       200:
 *        description: Hostname returned successfuly
 *       500:
 *         description: System is unhealthy
 */
const getCurrentHostnameAction = (): RequestHandler => async (_, res) =>
  res.status(200).json({
    hostname: process.env.HOSTNAME ?? 'NOT_DEFINED',
  });

export default getCurrentHostnameAction;
