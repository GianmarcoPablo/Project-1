import { Study } from "@prisma/client";


export class CreateProfileDto {
    constructor(
        public userId: string,
        public skills: string[],
        public languages: string[],
        public links: string[],
        public bio?: string,
        public phone?: string,
        public country?: string,
        public yearsOfExp?: number,
        public education?: Study,
        public openSearch?: boolean,
    ) { }


    static create(object: { [key: string]: any; }): [string?, CreateProfileDto?] {
        const { userId, bio, phone, country, yearsOfExp, education, openSearch, skills, languages, links } = object;

        if (!userId) return ['Missing userId'];
        if (!bio) return ['Missing bio'];
        if (!phone) return ['Missing phone'];
        if (!country) return ['Missing country'];
        if (!yearsOfExp) return ['Missing yearsOfExp'];
        if (!education) return ['Missing education'];
        if (!openSearch) return ['Missing openSearch'];
        if (!skills) return ['Missing skills'];
        if (!languages) return ['Missing languages'];
        if (!links) return ['Missing links'];
        if (skills.length < 1) return ['skills must have at least one element'];
        if (languages.length < 1) return ['languages must have at least one element'];
        if (links.length < 1) return ['links must have at least one element'];


        return [
            undefined,
            new CreateProfileDto(userId, bio, phone, country, yearsOfExp, education, openSearch, skills, languages, links)
        ];
    }
}