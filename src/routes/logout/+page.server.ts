import { redirect } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
    throw redirect(303, '/');
}

export const actions: Actions = {
    logout: async ({ cookies }) => {
        cookies.delete('session', { path: '/' });
        
        throw redirect(303, '/login')
    }
}