import prisma from "@/util/prisma";
import { atomWithStorage } from "jotai/utils";

export const _val_poin = atomWithStorage<any[]>("_val_poin", [])