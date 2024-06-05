import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import bcrypt from 'bcrypt';
import { db } from "$lib/prisma";
