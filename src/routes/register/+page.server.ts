import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { expoOut } from "svelte/easing";
// import bcrypt from 'bcrypt'
// import { db } from "$lib/prisma";

export const action : Actions = {
    register : async ({request}) => {
        const data = await request.formData();
        const name = data.get("name");
        const password = data.get("password");

        if (typeof name !== "string" || typeof password ! == "string" || !name || !password) {
            return fail(400, {message: "名前・パスワードは必須です・
            
            "})
        }
    }
}