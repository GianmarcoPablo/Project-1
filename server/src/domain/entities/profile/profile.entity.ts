import { Study } from "@prisma/client";

export class ProfileEntity {

    constructor(
        public skills: string[],
        public languages: string[],
        public links: string[],
        public id: string | null,
        public userId?: string | null,
        public bio?: string | null,
        public phone?: string | null,
        public country?: string | null,
        public yearsOfExp?: number | null,
        public education?: Study | null,
        public openSearch?: boolean | null,
    ) { }
}