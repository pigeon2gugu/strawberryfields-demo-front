export type TCommonResponse<T> = {
    code: string;
    message: string;
    data: T;
};