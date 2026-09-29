import { getSettings, getPages } from "./api";

async function start() {
    const [settings, page] = await Promise.all([
        getSettings(),
        getPages(location.pathname),
    ]);

    document.title = page.title;

    const headerLogo = document.querySelector(".header__logo");
    headerLogo.textContent = settings.siteName;

    const headerNav = document.querySelector(".header__nav");
    for (const el of settings.menu) {
        headerNav.innerHTML += `<a class="header__link" href="${el.link}">${el.label}</a>`;
    }

    const main = document.querySelector("main");

    const hero = page.blocks[0];
    const sectionHero = `<section class="${hero.type}">
        <div class="hero__content">
            <span class="hero__badge">${hero.badge}</span>
            <h1 class="hero__title">${hero.title}</h1>
            <p class="hero__subtitle">${hero.subtitle}</p>
            <div class="hero__actions">
                ${hero.buttons
                    .map(
                        (button) =>
                            `<a class="btn btn--${button.variant}" href="${button.link}">${button.text}</a>`,
                    )
                    .join("")}
            </div>
        </div>
        <img src="${hero.image.src}" alt="${hero.image.alt}">
    </section>`;

    const features = page.blocks[1];
    const sectionFeatures = `<section id="${features.anchor}" class="${features.type}">
        <h2 class="section-title">${features.title}</h2>
        <div class="features__grid">
            ${features.items
                .map((item) => {
                    return `<article class="feature">
                                <span class="feature__icon">${item.icon}</span>
                                <h3 class="feature__title">${item.title}</h3>
                                <p class="feature__text">${item.text}</p>
                            </article>`;
                })
                .join("")}
        </div>
    </section>`;

    const testimonials = page.blocks[2];
    const sectionTestimonials = `<section id="${testimonials.anchor}" class="${testimonials.type}">
        <h2 class="section-title">${testimonials.title}</h2>
        <div class="testimonials__list">
            ${testimonials.items
                .map((item) => {
                    return `<figure class="testimonial">
                                <div class="testimonial__rating">${"★".repeat(item.rating)}</div>
                                <blockquote class="testimonial__text">${item.text}</blockquote>
                                <figcaption class="testimonial__name">${item.name}</figcaption>
                            </figure>`;
                })
                .join("")}
        </div>
    </section>`;

    const contacts = page.blocks[3];
    const sectionContacts = `<section id="${contacts.anchor}" class="${contacts.type}">
        <h2 class="section-title">${contacts.title}</h2>
        <a class="contacts__link" href="tel:${contacts.phone}">${contacts.phone}</a>
        <a class="contacts__link" href="mailto:${contacts.email}">${contacts.email}</a>
        <p class="contacts__address">${contacts.address}</p>
    </section>`;

    main.innerHTML =
        sectionHero + sectionFeatures + sectionTestimonials + sectionContacts;

    const footer = document.querySelector(".footer");
    footer.textContent = `© ${new Date().getFullYear()} ${settings.siteName}. ${settings.footer.text}`;
}

start();
