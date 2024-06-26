import { db } from "$lib/prisma";
import { type Actions, fail, redirect } from "@sveltejs/kit";
import bcrypt from "bcrypt"

export const actions: Actions = {
    login: async ({request, cookies}) =>{
        const data = await request.formData();
        const name = data.get("name");
        const password = data.get("password");

        if (typeof name !== "string" || typeof password !== "string" || !name || !password) {
            return fail(400, {message: "名前とパスワードを入力ください"})
        }

        const user = await db.user.findUnique({
            where: {name}
        })
        if (!user) {
            return fail(400, {message: "名前またはパスワードが間違っています。"})
        }

        const correctPassword = await bcrypt.compare(password, user.password)
        if (!correctPassword) {
            return fail(400, {message: "名前またはパスワードを間違えています。"})
        }

        const authenticatedsUser = await db.user.update({
            where: {name},
            data: {
                authToken: crypto.randomUUID()
            }
        })


        cookies.set('session', authenticatedsUser.authToken, {
            path: '/',
            maxAge: 60*60*24**30,
        })

        throw redirect(303, '/')
    }
}