"use server";

import { cookies } from "next/headers";

const getCookie = async (cookieName: string) : Promise<string | undefined> => {
  const cookieStore = cookies();
  return cookieStore.get(cookieName)?.value;
};

const setCookie = async (cookieName: string, cookieValue: string) => {
  const cookieStore = cookies();
  cookieStore.set(cookieName, cookieValue);
};

export {getCookie, setCookie}