import { singleton, fields } from "@keystatic/core";

export const homePage = singleton({
  label: "🏠 Home",
  path: "src/content/pages/home",
  format: { data: "json" },
  schema: {
    slide: fields.array(
      fields.object({
        title: fields.text({
          label: "Titolo",
          validation: { isRequired: true },
        }),
        image: fields.image({
          label: "Immagine",
          directory: "src/assets/img/cms/home",
          publicPath: "/src/assets/img/cms/home",
          validation: { isRequired: true },
        }),
      }),
      {
        label: "Slide hero Home",
        itemLabel: (props) => props.fields.title.value,
      },
    ),
  
  pretitle:fields.text({
    label: "Pre-titolo",
    validation: { isRequired: true },
  }),
  title: fields.text({
    label: "Titolo",
    validation: { isRequired: true },
  }),
  description: fields.text({
    label: "Descrizione",
    multiline: true,
    validation: { isRequired: true },
  }),
},
});
