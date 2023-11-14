export interface COMMENT2 {
    id: string
    name: string
    uid: string
    img: string
    text: any
    data: Data
    createdAt: string
    updatedAt: string
}

export interface Data {
    msgId: string
    secUid: string
    userId: string
    comment: string
    nickname: string
    uniqueId: string
    createTime: string
    followInfo: FollowInfo
    followRole: number
    userBadges: any[]
    isModerator: boolean
    isNewGifter: boolean
    userDetails: UserDetails
    isSubscriber: boolean
    topGifterRank: any
    profilePictureUrl: string
}

export interface FollowInfo {
    pushStatus: number
    followStatus: number
    followerCount: number
    followingCount: number
}

export interface UserDetails {
    createTime: string
    bioDescription: string
    profilePictureUrls: string[]
}
