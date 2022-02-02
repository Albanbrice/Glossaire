import parse, { attributesToProps, domToReact } from "html-react-parser";
import { Tooltip, Typography, Box } from "@material-ui/core";
// import {Tooltip as PowerTolltip} from "react-power-tooltip"
import "./styles.css";

const lang = "fr"

const gloss = [
  {
    id: "hypogee",
    titre: {
      fr: "Hypogée",
      en: "Hypogeum ",
      it: "Ipogeo"
    },
    definition: {
      fr: "tombe souterraine, généralement creusée dans la roche.",
      en: "an underground chamber or grave, usually dug into the rock.",
      it: "tomba sotterranea, di solito scavata nella roccia."
    }
  },
  {
    id: "tarquinia",
    titre: {
      fr: "Tarquinia",
      en: "Tarquinia",
      it: "Tarquinia"
    },
    definition: {
      fr:
        "nom italien actuel du bourg italien nommé précédemment Corneto. Ce nom est aussi celui du site archéologique, à proximité, de la cité étrusque de <i>Tarchna</i> et de ses nécropoles.",
      en:
        "the current Italian name of the town formerly called Corneto, site of the Etruscan city of <i>Tarchna</i> and its necropoleis.",
      it:
        "attuale nome italiano della cittadina italiana prima chiamata Corneto. Questo nome è anche quello del sito archeologico, nelle sue vicinanze, della città etrusca di <p>Tarchna</p> e delle sue necropoli."
    }
  },
  {
    id: "beaufort",
    titre: {
      fr: "Philippe Léonce de Beaufort",
      en: "Philippe Léonce de Beaufort",
      it: "Philippe Léonce de Beaufort"
    },
    definition: {
      fr:
        "général français né en 1825 à Saint-Benoît-du-Sault, mort en 1876 à La Châtre. En 1859, il participe à la campagne d’Italie et est blessé à Solferino. À nouveau envoyé en Italie, à Civitavecchia, entre 1867 et août 1870, il est commandant du 6<sup>e</sup> bataillon de chasseurs à pied stationné à Corneto jusqu’en 1868. Il paraît probable qu’il fut le militaire français, cité par Dasti, qui entreprit de fouiller la tombe dell’Orco en 1868. Il constitua une collection d’antiquités, sans doute lors de son séjour en Italie, et la légua à la ville de La Châtre.",
      en:
        "a French general, born in 1825 in Saint-Benoît-du-Sault, died in 1876 in La Châtre. In 1859, he took part in the Italian campaign and was wounded at Solferino. He was again sent to Italy, to Civitavecchia, between 1867 and August 1870. He was commander of the 6<sup>th</sup> battalion of <i>chasseurs à pied</i> (light infantry), stationed at Corneto until 1868. He may have been the French soldier mentioned by Dasti who began to excavate the tomb of Orcus in 1868. He assembled a collection of antiquities, most probably during his time in Italy, which he donated to the city of La Châtre.",
      it:
        "generale francese nato nel 1825 a Saint-Benoît-du-Sault, morto nel 1876 a La Châtre. Nel 1859 partecipò alla campagna d'Italia e fu ferito a Solferino. Venne di nuovo inviato in Italia, a Civitavecchia, tra il 1867 e l'agosto 1870. Fu comandante del 6° battaglione di <i>chasseurs à pied</i> (fanteria leggera) di stanza a Corneto fino al 1868. Sembra probabile che sia stato il soldato francese, citato da Dasti, che intraprese lo scavo della tomba dell'Orco nel 1868. Formò una collezione di antichità, probabilmente durante il suo soggiorno in Italia, e la lasciò in eredità alla città di La Châtre."
    }
  }
];

const txt =
  'La tombe <mark id="hypogee"><i>hypogée</i></mark> est composée de deux tombes, <strong>Orco I</strong> (400-380 av. J.-C.) et <strong>Orco II</strong> (350-325 av. J.-C.), reliées entre elles. Elle porte aussi les noms de <strong>tombe de l’Ogre</strong> et de <strong>tombe de Polifemo</strong>. Elle est située sous le cimetière moderne de <mark id="tarquinia"><mark id="tarquinia">Tarquinia</mark></mark>. Luigi Dasti (1878) rapporte qu’elle fut découverte par un officier français en 1868. L’étude des registres de l’armée française nous laisse penser qu’il pourrait s’agir du général <mark id="beaufort">Philippe Léonce de Beaufort</mark>, qui avait rassemblé une collection d’antiquités étrusques. La tombe fut à nouveau fouillée en 1869. Les peintures ont subi plusieurs restaurations depuis 1881, les dernières datant de 2005. Elles ont été régulièrement relevées par des dessinateurs de 1869 à 1990.';

const ParseTxt = () => {
  const options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.name === "mark") {
        const props = attributesToProps(domNode.attribs);
        console.dir(props);

        return (
          <span {...props}>
            <i>test</i>
          </span>
        );
      }
    }
  };



  const options2 = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.id === "hypogee") {
        const props = attributesToProps(domNode.attribs);
        return <span {...props}>{domNode.children}</span>;
      }
    }
  };

  function replaceHtmlWithReact({ attribs, children }) {
    if (!attribs) return;
    const txt = gloss.find(obj => {return obj.id === attribs.id})
    if (!txt) return;
    const {definition, titre, id}
  
    /* const txtBrut = gloss.find(obj => {return obj.id === attribs.id}) */
   /*  const {definition, titre} = txtBrut */
    if (attribs.id === id) {
      
      return (
        <Tooltip title='test' arrow>
          <span style={{ color: "hotpink" }}>
            <>{domToReact(children, { replace: replaceHtmlWithReact })}</>
          </span>
        </Tooltip>
      );
    }
  }

  const prettyTxt = parse(txt, { replace: replaceHtmlWithReact });

  /*  console.log(prettyTxt[1]); */

  return (
    <Box>
      <Typography>{prettyTxt}</Typography>
    </Box>
  );
};

export default function App() {
  return (
    <div className="App">
      <ParseTxt />
    </div>
  );
}
