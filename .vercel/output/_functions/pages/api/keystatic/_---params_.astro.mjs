import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import { parseString } from 'set-cookie-parser';
import { collection, fields, singleton, config as config$1 } from '@keystatic/core';
import React from 'react';
import { s as siteConfig } from '../../../chunks/siteConfig_BuqaqTD0.mjs';
export { renderers } from '../../../renderers.mjs';

function makeHandler(_config) {
  return async function keystaticAPIRoute(context) {
    var _context$locals, _ref, _config$clientId, _ref2, _config$clientSecret, _ref3, _config$secret;
    const envVarsForCf = (_context$locals = context.locals) === null || _context$locals === void 0 || (_context$locals = _context$locals.runtime) === null || _context$locals === void 0 ? void 0 : _context$locals.env;
    const handler = makeGenericAPIRouteHandler({
      ..._config,
      clientId: (_ref = (_config$clientId = _config.clientId) !== null && _config$clientId !== void 0 ? _config$clientId : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_ID) !== null && _ref !== void 0 ? _ref : tryOrUndefined(() => {
        return undefined                                          ;
      }),
      clientSecret: (_ref2 = (_config$clientSecret = _config.clientSecret) !== null && _config$clientSecret !== void 0 ? _config$clientSecret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_SECRET) !== null && _ref2 !== void 0 ? _ref2 : tryOrUndefined(() => {
        return undefined                                              ;
      }),
      secret: (_ref3 = (_config$secret = _config.secret) !== null && _config$secret !== void 0 ? _config$secret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_SECRET) !== null && _ref3 !== void 0 ? _ref3 : tryOrUndefined(() => {
        return undefined                                ;
      })
    }, {
      slugEnvName: "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG"
    });
    const {
      body,
      headers,
      status
    } = await handler(context.request);
    let headersInADifferentStructure = /* @__PURE__ */ new Map();
    if (headers) {
      if (Array.isArray(headers)) {
        for (const [key, value] of headers) {
          if (!headersInADifferentStructure.has(key.toLowerCase())) {
            headersInADifferentStructure.set(key.toLowerCase(), []);
          }
          headersInADifferentStructure.get(key.toLowerCase()).push(value);
        }
      } else if (typeof headers.entries === "function") {
        for (const [key, value] of headers.entries()) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
        if ("getSetCookie" in headers && typeof headers.getSetCookie === "function") {
          const setCookieHeaders2 = headers.getSetCookie();
          if (setCookieHeaders2 !== null && setCookieHeaders2 !== void 0 && setCookieHeaders2.length) {
            headersInADifferentStructure.set("set-cookie", setCookieHeaders2);
          }
        }
      } else {
        for (const [key, value] of Object.entries(headers)) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
      }
    }
    const setCookieHeaders = headersInADifferentStructure.get("set-cookie");
    headersInADifferentStructure.delete("set-cookie");
    if (setCookieHeaders) {
      for (const setCookieValue of setCookieHeaders) {
        var _options$sameSite;
        const {
          name,
          value,
          ...options
        } = parseString(setCookieValue);
        const sameSite = (_options$sameSite = options.sameSite) === null || _options$sameSite === void 0 ? void 0 : _options$sameSite.toLowerCase();
        context.cookies.set(name, value, {
          domain: options.domain,
          expires: options.expires,
          httpOnly: options.httpOnly,
          maxAge: options.maxAge,
          path: options.path,
          sameSite: sameSite === "lax" || sameSite === "strict" || sameSite === "none" ? sameSite : void 0
        });
      }
    }
    return new Response(body, {
      status,
      headers: [...headersInADifferentStructure.entries()].flatMap(([key, val]) => val.map((x) => [key, x]))
    });
  };
}
function tryOrUndefined(fn) {
  try {
    return fn();
  } catch {
    return void 0;
  }
}

const blogCollection = collection({
  label: "📰 Blog",
  slugField: "title",
  path: "src/content/blog/*",
  columns: ["title", "date"],
  format: { contentField: "body" },
  entryLayout: "content",
  schema: {
    title: fields.slug({
      name: {
        label: "Titolo",
        validation: { isRequired: true }
      }
    }),
    excerpt: fields.text({
      label: "Breve descrizione",
      multiline: true,
      validation: { length: { max: 160 }, isRequired: true }
    }),
    date: fields.datetime({
      label: "Data di pubblicazione",
      validation: { isRequired: true },
      defaultValue: { kind: "now" }
    }),
    thumbnail: fields.image({
      label: "Immagine in evidenza",
      directory: "src/assets/img/cms/blog",
      publicPath: "/src/assets/img/cms/blog",
      validation: { isRequired: true }
    }),
    body: fields.markdoc({
      label: "Scrivi il tuo articolo",
      extension: "md",
      options: {
        image: {
          directory: "public/img/blogEntry",
          publicPath: "/img/blogEntry"
        }
      }
    }),
    categoria: fields.array(
      fields.relationship({
        label: "Categorie",
        validation: { isRequired: true },
        description: "Lista delle categorie di questo articolo",
        collection: "categorie"
      }),
      {
        label: "Categorie",
        itemLabel: (item) => item.value || "Seleziona una categoria"
      }
    ),
    galleria: fields.array(
      fields.object({
        src: fields.image({
          label: "Source",
          directory: "src/assets/img/cms/blog",
          publicPath: "/src/assets/img/cms/blog"
        }),
        alt: fields.text({ label: "Alt Text" })
      }),
      {
        label: "Galleria di Immagini",
        itemLabel: (props) => props.fields.alt.value
      }
    )
  }
});

const categorieCollection = collection({
  label: "📑 Categorie Blog",
  slugField: "title",
  path: "src/content/categorie/*",
  columns: ["title", "icon"],
  format: { contentField: "emptyContent" },
  schema: {
    emptyContent: fields.emptyContent({ extension: "md" }),
    title: fields.slug({
      name: { label: "Titolo", validation: { isRequired: true } }
    }),
    description: fields.text({
      label: "Breve descrizione",
      multiline: true,
      validation: { isRequired: true }
    }),
    icon: fields.text({
      label: "Icona categoria",
      validation: { isRequired: true },
      defaultValue: "mdi:mountain-outline"
    })
  }
});

const collections = {
  blog: blogCollection,
  categorie: categorieCollection
};

const caroselloHomeSingleton = singleton({
  label: "🎠 Carosello Attività Home",
  path: "src/content/carousel/caroselloattivita",
  format: { data: "json" },
  schema: {
    slide: fields.array(
      fields.object({
        title: fields.text({
          label: "Titolo",
          validation: { isRequired: true }
        }),
        link: fields.url({ label: "Link", validation: { isRequired: true } }),
        image: fields.image({
          label: "Immagine",
          directory: "src/assets/img/cms/carosello",
          publicPath: "/src/assets/img/cms/carosello",
          validation: { isRequired: true }
        })
      }),
      {
        label: "Slide carosello attività",
        itemLabel: (props) => props.fields.title.value
      }
    )
  }
});

const navbarHeaderSingleton = singleton({
  label: "🛠️ Navbar",
  path: "src/content/navbar/navbarHeader",
  format: { data: "json" },
  schema: {
    items: fields.array(
      fields.object({
        label: fields.text({
          label: "Etichetta",
          validation: { isRequired: true }
        }),
        path: fields.text({
          label: "Percorso",
          validation: { isRequired: true }
        }),
        icon: fields.text({
          label: "Icona",
          description: "Puoi trovare le icone qui https://icon-sets.iconify.design/mdi/"
        }),
        externalLink: fields.checkbox({ label: "Link esterno" }),
        children: fields.array(
          fields.object({
            label: fields.text({
              label: "Etichetta",
              validation: { isRequired: true }
            }),
            path: fields.text({
              label: "Percorso",
              validation: { isRequired: true }
            })
          }),
          {
            label: "Sottomenu",
            itemLabel: (props) => props.fields.label.value
          }
        )
      }),
      {
        label: "Voci della Navbar Header",
        itemLabel: (props) => props.fields.label.value
      }
    )
  }
});

const homePage = singleton({
  label: "🏠 Home",
  path: "src/content/pages/home",
  format: { data: "json" },
  schema: {
    seoTitle: fields.text({
      label: "Titolo SEO",
      validation: {
        isRequired: true,
        length: { max: 80 }
      }
    }),
    seoDescription: fields.text({
      label: "Descrizione SEO",
      multiline: true,
      validation: {
        isRequired: true,
        length: { max: 160 }
      }
    }),
    slide: fields.array(
      fields.object({
        title: fields.text({
          label: "Titolo",
          validation: { isRequired: true }
        }),
        image: fields.image({
          label: "Immagine",
          directory: "src/assets/img/cms/home",
          publicPath: "/src/assets/img/cms/home",
          validation: { isRequired: true }
        })
      }),
      {
        label: "Slide hero Home",
        itemLabel: (props) => props.fields.title.value
      }
    ),
    pretitle: fields.text({
      label: "Pre-titolo",
      validation: { isRequired: true }
    }),
    title: fields.text({
      label: "Titolo",
      validation: { isRequired: true }
    }),
    description: fields.text({
      label: "Descrizione",
      multiline: true,
      validation: { isRequired: true }
    })
  }
});

const singletons = {
  caroselloHome: caroselloHomeSingleton,
  navbarHeader: navbarHeaderSingleton,
  home: homePage
};

const config = config$1({
  storage: { kind: "cloud" },
  cloud: { project: siteConfig.keystaticProject },
  ui: {
    brand: {
      name: siteConfig.site.defaultTitle,
      mark: () => React.createElement("img", { src: siteConfig.site.favicon, width: 35 })
    },
    navigation: {
      Pagine: ["home"],
      Blog: ["blog", "categorie"],
      Home: ["caroselloHome"],
      Impostazioni: ["navbarHeader"]
    }
  },
  collections,
  singletons
});

const all = makeHandler({ config });
const ALL = all;

const prerender = false;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ALL,
  all,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
