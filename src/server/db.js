// In-memory placeholder for database connection
// Supabase has been removed as per user request

export const supabase = {
    from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: [], error: null }),
        upsert: () => ({ data: [], error: null }),
    })
};
