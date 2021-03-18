// Prisma2 는 fragment 쓰는 것보다 객체 안에 include 로 filtering 해주는게 더 좋은거 같음 
// 그래서 이거 대충 만들다 맘

export const COMMENT_FRAGMENT = `
    fragment UserParts on User{
        id
        text
        user{
            username
        }
    }
`;

export const USER_FRAGMENT = `
    fragment UserParts on User{
        id
        username
    }
`;

export const FILE_FRAGMENT = `
    fragment FileParts on File {
        id
        url
    }
`;

export const FULL_POST_FRAGMENT = `
    fragment PostParts on Post{
        id
        caption
        location
        likeCount
        created
    }
`;