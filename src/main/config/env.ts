export default {
    port: process.env.PORT || 5050,
    mongodbUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/procspy',
    bcryptSalt: 12,
    jwtSecret: process.env.JWT_SECRET || 'secretbanget',
    webrtcSecret: process.env.WEBRTC_SECRET || 'SECRET',
}