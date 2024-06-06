import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import bcrypt from 'bcrypt';
import { db } from "$lib/prisma";

export const actions: Actions = {
    // <form method="post" action="?/register">に対応
    register : async ({request}) => {
        const data = await request.formData(); // FormDataオブジェクトが返ってくる
        const name = data.get("name"); // data.get([inputのname値])  get(name: string): 指定したキーの最初の値を取得します。存在しない場合は null を返す
        const password = data.get("password");

        if (typeof name !== "string" || typeof password !== "string" || !name || !password) { // typeof　変数　で変数の型を返す
            return fail(400, {message: "名前・パスワードは必須です。"})
        }
        
        // DBに同じ名前のデータが存在しないかチェック
        const user = await db.user.findUnique({   // awaitを使うことで結果が返ってくるまで以降の処理には進まない 
            where : {name}
        })

        if (user) {
            return fail(400, {message: "すでに存在するユーザーです。"})
        }

        await db.user.create({
            data: {
                name, 
                password : await bcrypt.hash(password, 10),
                authToken: crypto.randomUUID(),
            }
        })

        throw redirect(303, "/login")
    }
}


// export const actions: Actions = {
//     register : async ({request}) => {
//         const data = await request.formData(); // awaitを使うことでリクエストが来るまで処理をまつ
//         const name = data.get("name");
//         const password = data.get("password");

//         if (typeof name !== "string" ||typeof password !== "string" || !name || !password) {
//             return fail(400, { message: "名前・パスワードは必須です。" })
//         }

//         const user = await db.user.findUnique({
//             where: {name}
//         })

//         if (user) {
//             return fail(400, { message: "既に存在するユーザーです。" })
//         }
        
//         await db.user.create({
//             data: {
//                 name,
//                 password : await bcrypt.hash(password, 10),
//                 authToken: crypto.randomUUID(),
//             },
//         })

//         throw redirect(303, '/login')
//     }
// }