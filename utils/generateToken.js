import jwt from 'jsonwebtoken'

export const createAccessToken = (payload) => {
    console.log(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET)
    return jwt.sign(payload, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET, {expiresIn: '30m'})
}

export const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}