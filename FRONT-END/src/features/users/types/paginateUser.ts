import type { User } from "@/features/auth"


export type PaginateUserResponse = {
    data: {
        data: User[],
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number | null;
        to: number | null;
        next_page_url: string | null;
        prev_page_url: string | null;
    }
    success: boolean;
    message: string;
}

