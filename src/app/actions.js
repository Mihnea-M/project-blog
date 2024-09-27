'use server'

import {cookies} from "next/headers";

export default async function serverToggleTheme(newCookies) {
    cookies().set('color-theme', newCookies, {
        maxAge: 31556926
    });
}