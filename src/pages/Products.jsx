import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import heroImg from "../assets/products/hero.webp";
import allProductsTop from "../assets/products/allProducts-top.webp";

/* PIPES */
import PvcPipes from "../assets/products/PvcPipes.webp";
import CpvcPipes from "../assets/products/CpvcPipes.webp";
import UpvcPipes from "../assets/products/UpvcPipes.webp";
import HdpePipes from "../assets/products/HdpePipes.webp";
import PipeFittings from "../assets/products/PipeFittings.webp";

/* PIPES & FITTINGS DETAILED */
import pf1 from "../assets/PIPES & FITTINGS/image1.webp";
import pf2 from "../assets/PIPES & FITTINGS/image2.webp";
import pf3 from "../assets/PIPES & FITTINGS/image3.webp";
import pf4 from "../assets/PIPES & FITTINGS/image4.webp";
import pf5 from "../assets/PIPES & FITTINGS/image5.webp";
import pf6 from "../assets/PIPES & FITTINGS/image6.webp";
import pf7 from "../assets/PIPES & FITTINGS/image7.webp";
import pf8 from "../assets/PIPES & FITTINGS/image8.webp";
import pf9 from "../assets/PIPES & FITTINGS/image9.webp";
import pf10 from "../assets/PIPES & FITTINGS/image10.webp";
import pf11 from "../assets/PIPES & FITTINGS/image11.webp";

/* LIGHTS CARDS */
import CeilingLights from "../assets/products/CeilingLights.webp";
import CeilingLights1 from "../assets/products/CeilingLights1.webp";
import LedBulb from "../assets/products/LedBulb.webp";
import LedLights from "../assets/products/LedLights.webp";
import BedLights from "../assets/products/BedLights.webp";

/* LIGHTS DETAILED */
import lt1 from "../assets/lights/image1.webp";
import lt2 from "../assets/lights/image2.webp";
import lt3 from "../assets/lights/image3.webp";
import lt4 from "../assets/lights/image4.webp";
import lt5 from "../assets/lights/image5.webp";
import lt6 from "../assets/lights/image6.webp";
import lt7 from "../assets/lights/image7.webp";
import lt8 from "../assets/lights/image8.webp";
import lt9 from "../assets/lights/image9.webp";
import lt10 from "../assets/lights/image10.webp";
import lt11 from "../assets/lights/image11.webp";
import lt12 from "../assets/lights/image12.webp";
import lt13 from "../assets/lights/image13.webp";
import lt14 from "../assets/lights/image14.webp";
import lt15 from "../assets/lights/image15.webp";
import lt16 from "../assets/lights/image16.webp";
import lt17 from "../assets/lights/image17.webp";
import lt18 from "../assets/lights/image18.webp";
import lt19 from "../assets/lights/image19.webp";
import lt20 from "../assets/lights/image20.webp";
import lt21 from "../assets/lights/image21.webp";
import lt22 from "../assets/lights/image2.webp";
import lt23 from "../assets/lights/image23.webp";
import lt24 from "../assets/lights/image24.webp";
import lt25 from "../assets/lights/image25.webp";

/* PROTECTION */
import SpnDoor from "../assets/home/image1.webp";
import TpnDoor from "../assets/home/image2.webp";
import Basbar from "../assets/home/image3.webp";

/* ── ADDED: PLUMBING (West Pipe & Teflon Tape) ── */
import westPipeImg from "../assets/pipe.webp";
import teflonTapeImg from "../assets/tape.webp";

/* ── ADDED: SWITCH / SURFACE BOX ── */
import surface1 from "../assets/surface/image1.webp";
import surface2 from "../assets/surface/image2.webp";
import surface3 from "../assets/surface/image3.webp";

/* ALL PRODUCTS */
import image1 from "../assets/products/image1.webp";
import image2 from "../assets/products/image2.webp";
import image3 from "../assets/products/image3.webp";
import image4 from "../assets/products/image4.webp";
import image5 from "../assets/products/image5.webp";
import image6 from "../assets/products/image6.webp";
import image7 from "../assets/products/image7.webp";
import image8 from "../assets/products/image8.webp";
import image9 from "../assets/products/image9.webp";
import image10 from "../assets/products/image10.webp";
import image11 from "../assets/products/image11.webp";
import image12 from "../assets/products/image12.webp";
import image13 from "../assets/products/image13.webp";
import image14 from "../assets/products/image14.webp";

export default function Products({ addToCart }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get("category") || "products";

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("Specifications");
  const [selectedColor, setSelectedColor] = useState("green");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pipesRef = useRef(null);
  const lightsRef = useRef(null);
  const allProductsRef = useRef(null);
  const detailRef = useRef(null);

  // ── ADDED: ref for protection section ────────────────────────────────────
  const protectionRef = useRef(null);
  // ─────────────────────────────────────────────────────────────────────────

  // ── ADDED: refs for new sections ─────────────────────────────────────────
  const plumbingRef = useRef(null);
  const switchRef = useRef(null);
  // ─────────────────────────────────────────────────────────────────────────

  /* RESET & SCROLL WHEN CATEGORY CHANGES */

  useEffect(() => {
    setSelectedProduct(null);
    setCurrentPage(1);

    const timer = setTimeout(() => {
      if (selectedCategory === "pipes") {
        pipesRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else if (selectedCategory === "lights") {
        lightsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else if (selectedCategory === "all") {
        allProductsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        // ── ADDED: scroll to protection section ──────────────────────────────
      } else if (selectedCategory === "protection") {
        protectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // ─────────────────────────────────────────────────────────────────────
        // ── ADDED: scroll to plumbing & switch sections ───────────────────────
      } else if (selectedCategory === "plumbing") {
        plumbingRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else if (selectedCategory === "switch") {
        switchRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // ─────────────────────────────────────────────────────────────────────
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  /* PIPES */

  const pipeProducts = [
    { image: PvcPipes, title: "PVC Pipes" },
    { image: CpvcPipes, title: "CPVC Pipes" },
    { image: UpvcPipes, title: "UPVC Pipes" },
    { image: HdpePipes, title: "HDPE Pipes" },
    { image: PipeFittings, title: "Pipe Fittings" },
  ];

  // ── ADDED: PIPES & FITTINGS detailed products ─────────────────────────────
  const pipesFittingsProducts = [
    {
      image: pf1,
      title: "CFOUR PVC PIPES",
      specs: [
        { code: "CF 001", description: "19MM 1.0 GREEN", price: "67.00" },
        { code: "CF 002", description: "19MM 1.5 BLACK", price: "88.00" },
        { code: "CF 003", description: "19MM 2.0 BLUE", price: "117.00" },
        { code: "CF 004", description: "25MM 1.0 GREEN", price: "103.00" },
        { code: "CF 005", description: "25MM 1.5 BLACK", price: "118.00" },
        { code: "CF 006", description: "25MM 2.0 BLUE", price: "171.00" },
      ],
    },
    {
      image: pf2,
      title: "CFOUR CONDUIT BENDS",
      specs: [
        { code: "CF 007", description: "19MM 1.5", price: "8.00" },
        { code: "CF 008", description: "25MM 1.5", price: "10.00" },
        { code: "CF 009", description: "19MM 2.0", price: "12.00" },
        { code: "CF 010", description: "25MM 2.0", price: "14.00" },
      ],
    },
    {
      image: pf3,
      title: "CFOUR T & L BOW FITTINGS",
      specs: [
        { code: "CF 011", description: "19MM L. BOW", price: "4.00" },
        { code: "CF 012", description: "25MM L. BOW", price: "5.00" },
        { code: "CF 013", description: "19MM T", price: "5.00" },
        { code: "CF 014", description: "25MM T", price: "6.00" },
        { code: "CF 015", description: "19MM COUPLER", price: "4.00" },
        { code: "CF 016", description: "25MM COUPLER", price: "5.00" },
      ],
    },
    {
      image: pf4,
      title: "CFOUR JUNCTION BOXES",
      specs: [
        {
          code: "CF 017",
          description: "19MM 1-WAY JUNCTION BOX",
          price: "14.00",
        },
        {
          code: "CF 018",
          description: "19MM 2-WAY JUNCTION BOX",
          price: "14.00",
        },
        {
          code: "CF 019",
          description: "19MM 3-WAY JUNCTION BOX",
          price: "14.00",
        },
        {
          code: "CF 020",
          description: "19MM 4-WAY JUNCTION BOX",
          price: "14.00",
        },
        {
          code: "CF 021",
          description: "25MM 1-WAY JUNCTION BOX",
          price: "15.00",
        },
        {
          code: "CF 022",
          description: "25MM 2-WAY JUNCTION BOX",
          price: "15.00",
        },
        {
          code: "CF 023",
          description: "25MM 3-WAY JUNCTION BOX",
          price: "15.00",
        },
        {
          code: "CF 024",
          description: "25MM 4-WAY JUNCTION BOX",
          price: "15.00",
        },
      ],
    },
    {
      image: pf5,
      title: "CFOUR DEEP BOXES",
      specs: [
        { code: "CF 025", description: "19MM 1-WAY DEEP BOX", price: "20.00" },
        { code: "CF 026", description: "19MM 2-WAY DEEP BOX", price: "20.00" },
        { code: "CF 027", description: "19MM 3-WAY DEEP BOX", price: "20.00" },
        { code: "CF 028", description: "19MM 4-WAY DEEP BOX", price: "20.00" },
        { code: "CF 029", description: "25MM 1-WAY DEEP BOX", price: "21.00" },
        { code: "CF 030", description: "25MM 2-WAY DEEP BOX", price: "21.00" },
        { code: "CF 031", description: "25MM 3-WAY DEEP BOX", price: "21.00" },
        { code: "CF 032", description: "25MM 4-WAY DEEP BOX", price: "21.00" },
      ],
    },
    {
      image: pf6,
      title: "CFOUR FLEXIBLE PIPES",
      specs: [
        {
          code: "CF 033",
          description: "16MM FLEXIBLE PIPE (WHITE) 50Mtr",
          price: "420.00",
        },
        {
          code: "CF 034",
          description: "20MM FLEXIBLE PIPE (WHITE) 50Mtr",
          price: "550.00",
        },
        {
          code: "CF 035",
          description: "25MM FLEXIBLE PIPE (WHITE) 25Mtr",
          price: "420.00",
        },
      ],
    },
    {
      image: pf7,
      title: "CFOUR PIPE DUMMIES",
      specs: [
        { code: "CF 036", description: "19MM PIPE DUMMY", price: "2.00" },
        { code: "CF 037", description: "25MM PIPE DUMMY", price: "3.00" },
      ],
    },
    {
      image: pf8,
      title: "CFOUR CABLE TIES",
      specs: [
        {
          code: "CF 038",
          description: "100*2.6 NYLON CABLE TIE",
          price: "32.00",
        },
        {
          code: "CF 039",
          description: "150*3.6 NYLON CABLE TIE",
          price: "76.00",
        },
        {
          code: "CF 040",
          description: "200*3.6 NYLON CABLE TIE",
          price: "96.00",
        },
        {
          code: "CF 041",
          description: "250*3.6 NYLON CABLE TIE",
          price: "126.00",
        },
        {
          code: "CF 042",
          description: "300*3.6 NYLON CABLE TIE",
          price: "154.00",
        },
        {
          code: "CF 043",
          description: "350*3.6 NYLON CABLE TIE",
          price: "190.00",
        },
        {
          code: "CF 044",
          description: "400*3.6 NYLON CABLE TIE",
          price: "238.00",
        },
        {
          code: "CF 045",
          description: "450*5.0 NYLON CABLE TIE",
          price: "368.00",
        },
      ],
    },
    {
      image: pf9,
      title: "CFOUR TAPE ROLL",
      specs: [{ code: "CF 046", description: "TAPE ROLL", price: "16.00" }],
    },
    {
      image: pf10,
      title: "CFOUR DUMMY SHEET",
      specs: [
        { code: "CF 047", description: "2 MODULE DUMMY", price: "45.00" },
        { code: "CF 048", description: "3 MODULE DUMMY", price: "50.00" },
        { code: "CF 049", description: "4 MODULE DUMMY", price: "70.00" },
      ],
    },
    {
      image: pf11,
      title: "CFOUR FOOT LIGHT",
      specs: [
        { code: "CF 050", description: "3 / 4 FOOT LIGHT", price: "180.00" },
      ],
    },
  ];
  // ─────────────────────────────────────────────────────────────────────────

  /* LIGHTS */

  const lightProducts = [
    { image: CeilingLights },
    { image: LedBulb },
    { image: LedLights },
    { image: CeilingLights1 },
    { image: BedLights },
  ];

  // ── ADDED: LIGHTS DETAILED products ──────────────────────────────────────
  const lightsDetailedProducts = [
    {
      image: lt1,
      title: "CEILING LIGHT",
      tableType: "watt-colour-price-box",
      columns: ["WATT", "COLOUR", "PRICE", "BOX"],
      rows: [
        { watt: "8W", colour: "WH,WW", price: "351/-", box: "60" },
        { watt: "15W", colour: "WH,WW", price: "492/-", box: "40" },
        { watt: "22W", colour: "WH,WW", price: "690/-", box: "20" },
      ],
    },
    {
      image: lt2,
      title: "SURFACE PANEL LIGHT",
      tableType: "watt-colour-price-box",
      columns: ["WATT", "COLOUR", "PRICE", "BOX"],
      rows: [
        { watt: "15W", colour: "WH", price: "760/-", box: "40" },
        { watt: "22W", colour: "WH", price: "925/-", box: "40" },
      ],
    },
    {
      image: lt3,
      title: "ROUND COB SPOT LIGHT",
      tableType: "watt-colour-price-box",
      columns: ["WATT", "COLOUR", "PRICE", "BOX"],
      rows: [
        { watt: "3W", colour: "WH,WW", price: "200/-", box: "100" },
        { watt: "3W", colour: "PK,BL,GR", price: "200/-", box: "100" },
        { watt: "3W", colour: "MULTI, 3 IN 1", price: "220/-", box: "100" },
      ],
    },
    {
      image: lt4,
      title: "MINI COB SPOT LIGHT / PIN LIGHT",
      tableType: "watt-colour-price-box",
      columns: ["WATT", "COLOUR", "PRICE", "BOX"],
      rows: [
        { watt: "1W", colour: "WH,WW", price: "136/-", box: "100" },
        { watt: "1W", colour: "PK,BL,GR", price: "136/-", box: "100" },
        { watt: "2W", colour: "WH,WW", price: "115/-", box: "100" },
        { watt: "2W", colour: "PK,BL,GR", price: "120/-", box: "100" },
        { watt: "3W", colour: "WW", price: "188/-", box: "100" },
      ],
    },
    {
      image: lt5,
      title: "BLACK COB SPOT LIGHT",
      tableType: "watt-colour-price-box",
      columns: ["WATT", "COLOUR", "PRICE", "BOX"],
      rows: [
        { watt: "1W", colour: "WW", price: "200/-", box: "100" },
        { watt: "3W", colour: "WW", price: "293/-", box: "100" },
      ],
    },
    {
      image: lt6,
      title: "ROSE GOLD COB SPOT LIGHT",
      tableType: "watt-colour-price-box",
      columns: ["WATT", "COLOUR", "PRICE", "BOX"],
      rows: [{ watt: "3W", colour: "WW", price: "293/-", box: "100" }],
    },
    {
      image: lt7,
      title: "SPOT LIGHT (BLACK) 5W",
      tableType: "watt-colour-price-box",
      columns: ["WATT", "COLOUR", "PRICE", "BOX"],
      rows: [{ watt: "5W", colour: "WW", price: "398/-", box: "100" }],
    },
    {
      image: lt8,
      title: "DOUBLE COLOUR CEILING LIGHT",
      tableType: "watt-colour-price-box",
      columns: ["WATT", "COLOUR", "PRICE", "BOX"],
      rows: [
        { watt: "3+3W", colour: "PGB", price: "258/-", box: "100" },
        { watt: "6+3W", colour: "PGB", price: "527/-", box: "40" },
      ],
    },
    {
      image: lt9,
      title: "LED POWER SUPPLY",
      tableType: "watt-amp-price-box",
      columns: ["WATT", "AMP.", "PRICE", "BOX"],
      rows: [
        { watt: "60", amp: "5", price: "445/-", box: "140" },
        { watt: "120", amp: "10", price: "562/-", box: "120" },
        { watt: "200", amp: "16.5", price: "761/-", box: "60" },
        { watt: "250", amp: "25", price: "901/-", box: "60" },
      ],
    },
    {
      image: lt10,
      title: "LED STRIP LIGHT",
      tableType: "model-mts-colour-price-pkg",
      columns: ["MODEL", "MTS", "COLOUR", "PRICE", "PKG"],
      rows: [
        {
          model: "240",
          mts: "5 Mts",
          colour: "WW,NW,WH",
          price: "936/-",
          pkg: "250 MTS",
        },
      ],
    },
    {
      image: lt11,
      title: "STREET LIGHT",
      tableType: "watt-price-box",
      columns: ["WATT", "PRICE", "BOX"],
      rows: [
        { watt: "24W", price: "842/-", box: "40" },
        { watt: "36W", price: "1287/-", box: "30" },
        { watt: "50W", price: "1521/-", box: "30" },
      ],
    },
    {
      image: lt12,
      title: "FLOOD LIGHT",
      tableType: "watt-colour-price-box",
      columns: ["WATT", "COLOUR", "PRICE", "BOX"],
      rows: [
        { watt: "50W", colour: "WH", price: "1521/-", box: "20" },
        { watt: "100W", colour: "WH", price: "2457/-", box: "14" },
      ],
    },
    {
      image: lt13,
      title: "WALL LIGHT (Model 198)",
      tableType: "model-watt-colour-price-box",
      columns: ["MODEL", "WATT", "COLOUR", "PRICE", "BOX"],
      rows: [
        {
          model: "198/2",
          watt: "2W",
          colour: "WW / A-RGB",
          price: "422/- / 492/-",
          box: "50",
        },
        {
          model: "198/4",
          watt: "4W",
          colour: "WW / A-RGB",
          price: "562/- / 656/-",
          box: "50",
        },
      ],
    },
    {
      image: lt14,
      title: "WALL LIGHT (Model 188)",
      tableType: "model-watt-colour-price-box",
      columns: ["MODEL", "WATT", "COLOUR", "PRICE", "BOX"],
      rows: [
        {
          model: "188/2",
          watt: "2W",
          colour: "WW / ARGB",
          price: "398/- / 527/-",
          box: "50",
        },
        {
          model: "188/4",
          watt: "4W",
          colour: "WW / ARGB",
          price: "548/- / 667/-",
          box: "50",
        },
        {
          model: "188/6",
          watt: "6W",
          colour: "WW / ARGB",
          price: "686/- / 866/-",
          box: "50",
        },
      ],
    },
    {
      image: lt15,
      title: "WALL LIGHT (Model 9058)",
      tableType: "model-watt-colour-price-box",
      columns: ["MODEL", "WATT", "COLOUR", "PRICE", "BOX"],
      rows: [
        {
          model: "9058/4",
          watt: "4W",
          colour: "RGB / ARGB",
          price: "975/- / 1205/-",
          box: "50",
        },
        {
          model: "9058/6",
          watt: "6W",
          colour: "RGB / ARGB",
          price: "1195/- / 1486/-",
          box: "50",
        },
      ],
    },
    {
      image: lt16,
      title: "BULKHEAD LIGHT",
      tableType: "watt-colour-price-box",
      columns: ["WATT", "COLOUR", "PRICE", "BOX"],
      rows: [{ watt: "20W", colour: "WHITE", price: "305/-", box: "50" }],
    },
    {
      image: lt17,
      title: "ROPE LIGHT",
      tableType: "colour-price-box",
      columns: ["COLOUR", "PRICE", "BOX"],
      rows: [
        {
          colour: "WW,BL,GR,PK,AMBER,ICE BLUE",
          price: "125/- Pr mtr",
          box: "200 Mtr.",
        },
        { colour: "RGB", price: "176/- Pr mtr", box: "200 Mtr." },
      ],
    },
    {
      image: lt18,
      title: "RGB ADAPTER",
      tableType: "name-price",
      columns: ["NAME", "PRICE"],
      rows: [{ name: "ADAPTER", price: "95/-" }],
    },
    {
      image: lt19,
      title: "RGB MULTI ADAPTER",
      tableType: "name-price",
      columns: ["NAME", "PRICE"],
      rows: [{ name: "MULTI ADAPTER", price: "410/-" }],
    },
    {
      image: lt20,
      title: "SURFACE SPOT LIGHT",
      tableType: "bodycolour-watt-colour-price-box",
      columns: ["BODY COLOUR", "WATT", "COLOUR", "PRICE", "BOX"],
      rows: [
        {
          bodycolour: "White",
          watt: "3W",
          colour: "WH,WW / BL,PK,GR",
          price: "200/- / 210/-",
          box: "50",
        },
        {
          bodycolour: "Black",
          watt: "3W",
          colour: "WW",
          price: "220/-",
          box: "50",
        },
      ],
    },
    {
      image: lt21,
      title: "CONNECTOR",
      tableType: "amp-price",
      columns: ["AMP", "PRICE"],
      rows: [
        { amp: "5 AMP", price: "8/-" },
        { amp: "10 AMP", price: "16/-" },
        { amp: "Heavy Connector Gray", price: "50/-" },
      ],
    },
    {
      image: lt22,
      title: "FLOOD LIGHT CHOCK",
      tableType: "watt-price",
      columns: ["WATT", "PRICE"],
      rows: [
        { watt: "50 W", price: "400/-" },
        { watt: "100 W", price: "865/-" },
      ],
    },
    {
      image: lt23,
      title: "PANEL LIGHT CHOCK",
      tableType: "watt-price",
      columns: ["WATT", "PRICE"],
      rows: [
        { watt: "8 - 24 W", price: "130/-" },
        { watt: "24 - 50 W", price: "350/-" },
      ],
    },
    {
      image: lt24,
      title: "STRIP CONNECTOR",
      tableType: "model-price",
      columns: ["MODEL", "PRICE"],
      rows: [
        { model: "CONNECTOR", price: "26/-" },
        { model: "L-CONNECTOR", price: "30/-" },
        { model: "WIRE-CONNECTOR", price: "40/-" },
      ],
    },
    {
      image: lt25,
      title: "ROPE CONNECTOR",
      tableType: "model-price",
      columns: ["MODEL", "PRICE"],
      rows: [{ model: "CONNECTOR", price: "30/-" }],
    },
  ];
  // ─────────────────────────────────────────────────────────────────────────

  // ── ADDED: helper to render any row generically ───────────────────────────
  const renderRow = (row) => Object.values(row);
  // ─────────────────────────────────────────────────────────────────────────

  // ── ADDED: protection products with price/packing data ───────────────────
  const protectionProducts = [
    {
      image: SpnDoor,
      title: "SPN D/DOOR",
      variants: [
        { name: "4WAY SPN D/DOOR", price: "1150/-", packing: "10 Nos" },
        { name: "6WAY SPN D/DOOR", price: "1240/-", packing: "10 Nos" },
        { name: "8WAY SPN D/DOOR", price: "1400/-", packing: "10 Nos" },
        { name: "12WAY SPN D/DOOR", price: "1700/-", packing: "10 Nos" },
        { name: "16WAY SPN D/DOOR", price: "2265/-", packing: "6 Nos" },
      ],
    },
    {
      image: TpnDoor,
      title: "TPN D/DOOR",
      variants: [
        { name: "4 TPN D/DOOR", price: "2840/-", packing: "5 Nos" },
        { name: "6 TPN D/DOOR", price: "3350/-", packing: "4 Nos" },
      ],
    },
    {
      image: Basbar,
      title: "BASBAR",
      variants: [
        { name: "63A BASBAR", price: "4250/-", packing: "4 Nos" },
        { name: "100A BASBAR", price: "6040/-", packing: "3 Nos" },
        { name: "200A BASBAR", price: "9475/-", packing: "2 Nos" },
      ],
    },
  ];
  // ─────────────────────────────────────────────────────────────────────────

  // ── ADDED: PLUMBING products ──────────────────────────────────────────────
  const plumbingProducts = [
    {
      image: teflonTapeImg,
      title: "TEFLON TAPE",
      specs: [
        {
          code: "CF 063",
          description: "TEFLON TAPE",
          price: "30.00",
          packing: "1000 Pcs",
        },
      ],
    },
    {
      image: westPipeImg,
      title: "WEST PIPE",
      specs: [
        {
          code: "CF 064",
          description: "WEST PIPE",
          price: "89.00",
          packing: "300 Pcs",
        },
      ],
    },
  ];
  // ─────────────────────────────────────────────────────────────────────────

  // ── ADDED: SWITCH / SURFACE BOX products ─────────────────────────────────
  const switchProducts = [
    {
      image: surface1,
      title: "CFOUR SPIKE",
      specs: [
        { code: "CF 051", description: "2 MTR. SPIKE", price: "490.00" },
        { code: "CF 052", description: "5 MTR. SPIKE", price: "590.00" },
      ],
    },
    {
      image: surface2,
      title: "CFOUR MCB JUNCTION BOX",
      specs: [
        {
          code: "CF 053",
          description: "1 / 2 MCB JUNCTION BOX",
          price: "37.00",
        },
        {
          code: "CF 054",
          description: "3 / 4 MCB JUNCTION BOX",
          price: "60.00",
        },
      ],
    },
    {
      image: surface3,
      title: "CFOUR SURFACE BOX",
      specs: [
        { code: "CF 055", description: "2 MODULE SURFACE BOX", price: "53.00" },
        { code: "CF 056", description: "3 MODULE SURFACE BOX", price: "65.00" },
        { code: "CF 057", description: "4 MODULE SURFACE BOX", price: "72.00" },
        { code: "CF 058", description: "6 MODULE SURFACE BOX", price: "96.00" },
        {
          code: "CF 059",
          description: "8 MODULE SURFACE BOX",
          price: "122.00",
        },
        {
          code: "CF 060",
          description: "12 MODULE SURFACE BOX",
          price: "134.00",
        },
        {
          code: "CF 061",
          description: "16 MODULE SURFACE BOX",
          price: "192.00",
        },
        {
          code: "CF 062",
          description: "18 MODULE SURFACE BOX",
          price: "220.00",
        },
      ],
    },
  ];
  // ─────────────────────────────────────────────────────────────────────────

  /* ALL PRODUCTS - PAGE 1 */

  const allProductsPage1 = [
    { image: image1, title: "CFOUR PVC Pipes" },
    { image: image2, title: "CFOUR Conduit Bends" },
    { image: image3, title: "CFOUR T-Bow Fittings" },
    { image: image4, title: "CFOUR Bow Fittings" },
    { image: image5, title: "CFOUR L-Bow Fittings" },
    { image: image6, title: "CFOUR Pipe" },
  ];

  /* ALL PRODUCTS - PAGE 2 */

  const allProductsPage2 = [
    { image: image7, title: "CFOUR PVC Pipes" },
    { image: image8, title: "CFOUR Conduit Bends" },
    { image: image9, title: "CFOUR T-Bow Fittings" },
    { image: image10, title: "CFOUR Bow Fittings" },
    { image: image11, title: "CFOUR L-Bow Fittings" },
    { image: image12, title: "CFOUR Pipe" },
  ];

  /* ALL PRODUCTS - PAGE 3 */

  const allProductsPage3 = [
    { image: image13, title: "CFOUR PVC Pipes" },
    { image: image14, title: "CFOUR Conduit Bends" },
  ];

  /* GET CURRENT PAGE PRODUCTS */

  const getCurrentPageProducts = () => {
    if (currentPage === 1) return allProductsPage1;
    if (currentPage === 2) return allProductsPage2;
    if (currentPage === 3) return allProductsPage3;
    return allProductsPage1;
  };

  /* HANDLE PAGE CHANGE */

  const handlePageChange = (page) => {
    setCurrentPage(page);

    allProductsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  /* HANDLE VIEW DETAILS */

  const handleViewDetails = (item) => {
    setSelectedProduct(item);
    setActiveTab("Specifications");
    setSelectedColor("green");

    setTimeout(() => {
      detailRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  /* HANDLE BACK */

  const handleBack = () => {
    setSelectedProduct(null);

    allProductsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  /* RELATED PRODUCTS */

  const relatedProducts = getCurrentPageProducts();

  // ── ADDED: shared dark card + specs table renderer ────────────────────────
  const renderProductCard = (product, index, onCartAdd) => (
    <div
      key={index}
      className="
        flex
        flex-col
        lg:flex-row
        gap-0
        bg-[#2d2d2d]
        rounded-md
        overflow-hidden
        shadow-md
        w-full
      "
    >
      {/* IMAGE BOX */}
      <div
        className="
          flex
          items-center
          justify-center
          bg-[#3a3a3a]
          w-full
          h-[240px]
          sm:h-[280px]
          lg:w-[280px]
          lg:h-auto
          flex-shrink-0
          overflow-hidden
        "
      >
        <img
          src={product.image}
          alt={product.title}
          className="
            w-full
            h-full
            object-cover
            object-center
          "
        />
      </div>

      {/* SPECS TABLE */}
      <div className="flex-1 p-4 sm:p-6 overflow-x-auto">
        <h3 className="text-white text-lg sm:text-xl font-bold mb-4 tracking-wide">
          {product.title}
        </h3>

        <table className="w-full text-xs sm:text-sm min-w-[300px]">
          <thead>
            <tr className="border-b border-gray-500">
              <th className="text-gray-400 text-left py-2 px-2 sm:px-3 font-medium whitespace-nowrap">
                Code
              </th>
              <th className="text-gray-400 text-left py-2 px-2 sm:px-3 font-medium">
                Description
              </th>
              <th className="text-gray-400 text-right py-2 px-2 sm:px-3 font-medium whitespace-nowrap">
                Price
              </th>
              {product.specs[0]?.packing && (
                <th className="text-gray-400 text-center py-2 px-2 sm:px-3 font-medium whitespace-nowrap">
                  Packing
                </th>
              )}
              <th className="text-gray-400 text-center py-2 px-2 sm:px-3 font-medium">
                Cart
              </th>
            </tr>
          </thead>
          <tbody>
            {product.specs.map((spec, sIndex) => (
              <tr
                key={sIndex}
                className="border-b border-gray-700 hover:bg-white/5 transition"
              >
                <td className="py-2 px-2 sm:px-3 text-gray-300 font-mono text-xs whitespace-nowrap">
                  {spec.code}
                </td>
                <td className="py-2 px-2 sm:px-3 text-white font-medium">
                  {spec.description}
                </td>
                <td className="py-2 px-2 sm:px-3 text-white text-right font-semibold whitespace-nowrap">
                  ₹{spec.price}
                </td>
                {spec.packing && (
                  <td className="py-2 px-2 sm:px-3 text-white text-center whitespace-nowrap">
                    {spec.packing}
                  </td>
                )}
                <td className="py-2 px-2 sm:px-3 text-center">
                  <button
                    onClick={() => onCartAdd(product, spec)}
                    className="
                      bg-red-500
                      text-white
                      px-2
                      sm:px-3
                      py-1
                      rounded-full
                      text-xs
                      hover:bg-red-600
                      transition
                      whitespace-nowrap
                    "
                  >
                    Add to Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* HERO IMAGE */}

      {selectedCategory !== "all" && (
        <section className="w-full bg-black overflow-hidden pt-[85px]">
          <img
            src={heroImg}
            alt="Products Hero"
            className="
      w-full
      object-cover
      object-top
      "
          />
        </section>
      )}

      {/* DEFAULT PRODUCTS PAGE */}

      {selectedCategory === "products" && (
        <>
          {/* PIPES */}

          <section
            ref={pipesRef}
            className="
            w-full
            py-10
            bg-[#d9d9d9]
            overflow-hidden
            "
          >
            <div className="px-6">
              <h2 className="text-4xl font-semibold mb-8">Pipes</h2>

              <div
                className="
                flex
                gap-6
                overflow-x-auto
                pb-4
                no-scrollbar
                "
              >
                {pipeProducts.map((item, index) => (
                  <div
                    key={index}
                    className="
                    min-w-[280px]
                    bg-[#f5f5f5]
                    rounded-md
                    p-5
                    flex-shrink-0
                    shadow-md
                    "
                  >
                    <img
                      src={item.image}
                      alt="pipe"
                      className="
                      w-full
                      h-[320px]
                      object-contain
                      scale-110
                      "
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* LIGHTS */}

          <section
            ref={lightsRef}
            className="
            w-full
            py-10
            bg-[#d9d9d9]
            overflow-hidden
            "
          >
            <div className="px-6">
              <h2 className="text-4xl font-semibold mb-8">Lights</h2>

              <div
                className="
                flex
                gap-6
                overflow-x-auto
                pb-4
                no-scrollbar
                "
              >
                {lightProducts.map((item, index) => (
                  <div
                    key={index}
                    className="
                    min-w-[280px]
                    bg-[#f5f5f5]
                    rounded-md
                    p-5
                    flex-shrink-0
                    shadow-md
                    "
                  >
                    <img
                      src={item.image}
                      alt="light"
                      className="
                      w-full
                      h-[320px]
                      object-contain
                      scale-110
                      "
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ONLY PIPES */}

      {selectedCategory === "pipes" && (
        <section
          ref={pipesRef}
          className="
          w-full
          py-10
          bg-[#d9d9d9]
          overflow-hidden
          "
        >
          <div className="px-4 sm:px-6">
            {/* ── EXISTING PIPE CARDS — UNTOUCHED ── */}
            <h2 className="text-3xl sm:text-4xl font-semibold mb-8">Pipes</h2>

            <div
              className="
              flex
              gap-6
              overflow-x-auto
              pb-4
              no-scrollbar
              "
            >
              {pipeProducts.map((item, index) => (
                <div
                  key={index}
                  className="
                  min-w-[280px]
                  bg-[#f5f5f5]
                  rounded-md
                  p-5
                  flex-shrink-0
                  shadow-md
                  "
                >
                  <img
                    src={item.image}
                    alt="pipe"
                    className="
                    w-full
                    h-[320px]
                    object-contain
                    scale-110
                    "
                  />
                </div>
              ))}
            </div>

            {/* ── PIPES & FITTINGS DETAILED SECTION BELOW ── */}
            <h2 className="text-3xl sm:text-4xl font-semibold mt-16 mb-8">
              PIPES & FITTINGS
            </h2>

            <div className="flex flex-col gap-6 sm:gap-10">
              {pipesFittingsProducts.map((product, index) => (
                <div
                  key={index}
                  className="
                  flex
                  flex-col
                  lg:flex-row
                  gap-0
                  bg-[#2d2d2d]
                  rounded-md
                  overflow-hidden
                  shadow-md
                  "
                >
                  {/* PRODUCT IMAGE */}
                  <div
                    className="
                    flex
                    items-center
                    justify-center
                    bg-[#3a3a3a]
                    w-full
                    h-[240px]
                    sm:h-[280px]
                    lg:w-[280px]
                    lg:h-auto
                    flex-shrink-0
                    overflow-hidden
                    "
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="
                      w-full
                      h-full
                      object-cover
                      object-center
                      "
                    />
                  </div>

                  {/* SPECS TABLE */}
                  <div className="flex-1 p-4 sm:p-6 overflow-x-auto">
                    <h3 className="text-white text-lg sm:text-xl font-bold mb-4 tracking-wide">
                      {product.title}
                    </h3>

                    <table className="w-full text-xs sm:text-sm min-w-[300px]">
                      <thead>
                        <tr className="border-b border-gray-500">
                          <th className="text-gray-400 text-left py-2 px-2 sm:px-3 font-medium whitespace-nowrap">
                            Code
                          </th>
                          <th className="text-gray-400 text-left py-2 px-2 sm:px-3 font-medium">
                            Description
                          </th>
                          <th className="text-gray-400 text-right py-2 px-2 sm:px-3 font-medium whitespace-nowrap">
                            Price
                          </th>
                          <th className="text-gray-400 text-center py-2 px-2 sm:px-3 font-medium">
                            Cart
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.specs.map((spec, sIndex) => (
                          <tr
                            key={sIndex}
                            className="border-b border-gray-700 hover:bg-white/5 transition"
                          >
                            <td className="py-2 px-2 sm:px-3 text-gray-300 font-mono text-xs whitespace-nowrap">
                              {spec.code}
                            </td>
                            <td className="py-2 px-2 sm:px-3 text-white font-medium">
                              {spec.description}
                            </td>
                            <td className="py-2 px-2 sm:px-3 text-white text-right font-semibold whitespace-nowrap">
                              ₹{spec.price}
                            </td>
                            <td className="py-2 px-2 sm:px-3 text-center">
                              <button
                                onClick={() =>
                                  addToCart({
                                    image: product.image,
                                    title: `${product.title} — ${spec.description}`,
                                    price: spec.price,
                                    code: spec.code,
                                  })
                                }
                                className="
                                bg-red-500
                                text-white
                                px-2
                                sm:px-3
                                py-1
                                rounded-full
                                text-xs
                                hover:bg-red-600
                                transition
                                whitespace-nowrap
                                "
                              >
                                Add to Cart
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
            {/* ── END PIPES & FITTINGS ── */}
          </div>
        </section>
      )}

      {/* ONLY LIGHTS */}

      {selectedCategory === "lights" && (
        <section
          ref={lightsRef}
          className="
          w-full
          py-10
          bg-[#d9d9d9]
          overflow-hidden
          "
        >
          <div className="px-4 sm:px-6">
            {/* ── EXISTING LIGHTS CARDS — UNTOUCHED ── */}
            <h2 className="text-3xl sm:text-4xl font-semibold mb-8">Lights</h2>

            <div
              className="
              flex
              gap-6
              overflow-x-auto
              pb-4
              no-scrollbar
              "
            >
              {lightProducts.map((item, index) => (
                <div
                  key={index}
                  className="
                  min-w-[280px]
                  bg-[#f5f5f5]
                  rounded-md
                  p-5
                  flex-shrink-0
                  shadow-md
                  "
                >
                  <img
                    src={item.image}
                    alt="light"
                    className="
                    w-full
                    h-[320px]
                    object-contain
                    scale-110
                    "
                  />
                </div>
              ))}
            </div>

            {/* ── LIGHTS DETAILED SECTION BELOW ── */}
            <h2 className="text-3xl sm:text-4xl font-semibold mt-16 mb-8">
              LIGHTS & ACCESSORIES
            </h2>

            <div className="flex flex-col gap-6 sm:gap-10">
              {lightsDetailedProducts.map((product, index) => (
                <div
                  key={index}
                  className="
                  flex
                  flex-col
                  lg:flex-row
                  gap-0
                  bg-[#2d2d2d]
                  rounded-md
                  overflow-hidden
                  shadow-md
                  "
                >
                  {/* PRODUCT IMAGE */}
                  <div
                    className="
                    flex
                    items-center
                    justify-center
                    bg-[#3a3a3a]
                    w-full
                    h-[240px]
                    sm:h-[280px]
                    lg:w-[280px]
                    lg:h-auto
                    flex-shrink-0
                    overflow-hidden
                    "
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="
                      w-full
                      h-full
                      object-cover
                      object-center
                      "
                    />
                  </div>

                  {/* SPECS TABLE */}
                  <div className="flex-1 p-4 sm:p-6 overflow-x-auto">
                    <h3 className="text-white text-lg sm:text-xl font-bold mb-4 tracking-wide">
                      {product.title}
                    </h3>

                    <table className="w-full text-xs sm:text-sm min-w-[300px]">
                      <thead>
                        <tr className="border-b border-gray-500">
                          {product.columns.map((col, cIndex) => (
                            <th
                              key={cIndex}
                              className="
                              text-gray-400
                              text-left
                              py-2
                              px-2
                              sm:px-3
                              font-medium
                              whitespace-nowrap
                              "
                            >
                              {col}
                            </th>
                          ))}
                          <th className="text-gray-400 text-center py-2 px-2 sm:px-3 font-medium whitespace-nowrap">
                            Cart
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.rows.map((row, rIndex) => (
                          <tr
                            key={rIndex}
                            className="border-b border-gray-700 hover:bg-white/5 transition"
                          >
                            {renderRow(row).map((cell, cIndex) => (
                              <td
                                key={cIndex}
                                className="py-2 px-2 sm:px-3 text-white font-medium"
                              >
                                {cell}
                              </td>
                            ))}
                            <td className="py-2 px-2 sm:px-3 text-center">
                              <button
                                onClick={() =>
                                  addToCart({
                                    image: product.image,
                                    title: `${product.title} — ${renderRow(row)[0]}`,
                                    price: row.price || "",
                                  })
                                }
                                className="
                                bg-red-500
                                text-white
                                px-2
                                sm:px-3
                                py-1
                                rounded-full
                                text-xs
                                hover:bg-red-600
                                transition
                                whitespace-nowrap
                                "
                              >
                                Add to Cart
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
            {/* ── END LIGHTS DETAILED ── */}
          </div>
        </section>
      )}

      {/* ── ADDED: PROTECTION SYSTEMS SECTION ───────────────────────────────── */}

      {selectedCategory === "protection" && (
        <section
          ref={protectionRef}
          className="
          w-full
          py-10
          bg-[#d9d9d9]
          overflow-hidden
          "
        >
          <div className="px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-8">
              Protection Systems
            </h2>

            <div className="flex flex-col gap-6 sm:gap-10">
              {protectionProducts.map((product, index) => (
                <div
                  key={index}
                  className="
                  flex
                  flex-col
                  lg:flex-row
                  gap-6
                  bg-[#2d2d2d]
                  rounded-md
                  overflow-hidden
                  shadow-md
                  "
                >
                  {/* PRODUCT IMAGE */}

                  <div
                    className="
                    flex
                    items-center
                    justify-center
                    bg-[#3a3a3a]
                    w-full
                    h-[240px]
                    sm:h-[280px]
                    lg:w-[280px]
                    lg:h-auto
                    flex-shrink-0
                    overflow-hidden
                    "
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="
                      w-full
                      h-full
                      object-cover
                      object-center
                      "
                    />
                  </div>

                  {/* PRICE TABLE */}

                  <div className="flex-1 p-4 sm:p-6 overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm min-w-[300px]">
                      <thead>
                        <tr>
                          <th className="bg-red-600 text-white text-center py-2 px-3 sm:px-4 font-semibold tracking-wider uppercase text-xs">
                            NAME
                          </th>
                          <th className="bg-red-600 text-white text-center py-2 px-3 sm:px-4 font-semibold tracking-wider uppercase text-xs border-l border-red-500">
                            PRICE
                          </th>
                          <th className="bg-red-600 text-white text-center py-2 px-3 sm:px-4 font-semibold tracking-wider uppercase text-xs border-l border-red-500">
                            PACKING
                          </th>
                          <th className="bg-red-600 text-white text-center py-2 px-3 sm:px-4 font-semibold tracking-wider uppercase text-xs border-l border-red-500">
                            CART
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.variants.map((variant, vIndex) => (
                          <tr key={vIndex} className="border-b border-gray-600">
                            <td className="py-3 px-3 sm:px-4 text-white text-center font-medium">
                              {variant.name}
                            </td>
                            <td className="py-3 px-3 sm:px-4 text-white text-center">
                              {variant.price}
                            </td>
                            <td className="py-3 px-3 sm:px-4 text-white text-center">
                              {variant.packing}
                            </td>
                            <td className="py-3 px-3 sm:px-4 text-center">
                              <button
                                onClick={() =>
                                  addToCart({
                                    image: product.image,
                                    title: variant.name,
                                    price: variant.price,
                                    packing: variant.packing,
                                  })
                                }
                                className="
                                bg-red-500
                                text-white
                                px-3
                                sm:px-4
                                py-1
                                sm:py-2
                                rounded-full
                                text-xs
                                sm:text-sm
                                hover:bg-red-600
                                transition
                                whitespace-nowrap
                                "
                              >
                                Add to Cart
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── END PROTECTION SYSTEMS SECTION ──────────────────────────────────── */}

      {/* ── ADDED: PLUMBING SECTION ──────────────────────────────────────────── */}

      {selectedCategory === "plumbing" && (
        <section
          ref={plumbingRef}
          className="
          w-full
          py-10
          bg-[#d9d9d9]
          overflow-hidden
          "
        >
          <div className="px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-8">
              Plumbing
            </h2>

            <div className="flex flex-col gap-6 sm:gap-10">
              {plumbingProducts.map((product, index) =>
                renderProductCard(product, index, (p, spec) =>
                  addToCart({
                    image: p.image,
                    title: `${p.title} — ${spec.description}`,
                    price: spec.price,
                    code: spec.code,
                  }),
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── END PLUMBING SECTION ─────────────────────────────────────────────── */}

      {/* ── ADDED: SWITCH / SURFACE BOX SECTION ─────────────────────────────── */}

      {selectedCategory === "switch" && (
        <section
          ref={switchRef}
          className="
          w-full
          py-10
          bg-[#d9d9d9]
          overflow-hidden
          "
        >
          <div className="px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-8">
              Surface Box Collection
            </h2>

            <div className="flex flex-col gap-6 sm:gap-10">
              {switchProducts.map((product, index) =>
                renderProductCard(product, index, (p, spec) =>
                  addToCart({
                    image: p.image,
                    title: `${p.title} — ${spec.description}`,
                    price: spec.price,
                    code: spec.code,
                  }),
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── END SWITCH / SURFACE BOX SECTION ────────────────────────────────── */}

      {/* ALL PRODUCTS */}

      {selectedCategory === "all" && (
        <>
          {/* ======================== */}
          {/* PRODUCT DETAIL FULL VIEW */}
          {/* ======================== */}

          {selectedProduct && (
            <section
              ref={detailRef}
              className="
              w-full
              bg-[#efefef]
              py-10
              px-6
              "
            >
              <div className="max-w-7xl mx-auto">
                {/* BREADCRUMB */}

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                  <button
                    onClick={handleBack}
                    className="
                    hover:text-black
                    transition
                    "
                  >
                    All Products
                  </button>

                  <span>/</span>

                  <span className="text-black font-medium">
                    {selectedProduct.title}
                  </span>
                </div>

                {/* DETAIL CONTENT */}

                <div className="flex flex-col gap-10 lg:flex-row">
                  {/* LEFT - THUMBNAILS + MAIN IMAGE */}

                  <div className="flex gap-4">
                    {/* THUMBNAILS */}

                    <div className="flex flex-col gap-3">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="
                          w-16
                          h-16
                          bg-gray-200
                          rounded-md
                          border
                          border-gray-300
                          flex-shrink-0
                          "
                        />
                      ))}
                    </div>

                    {/* MAIN IMAGE */}

                    <div
                      className="
                      w-full
                      max-w-[340px]
                      h-[280px]
                      sm:h-[340px]
                      bg-gray-200
                      rounded-md
                      border
                      border-gray-300
                      flex
                      items-center
                      justify-center
                      "
                    >
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.title}
                        className="
                        w-full
                        h-full
                        object-contain
                        p-4
                        "
                      />
                    </div>
                  </div>

                  {/* RIGHT - PRODUCT INFO */}

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">
                      {selectedProduct.title}
                    </h2>

                    {/* RATING */}

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex text-yellow-400 text-lg">★★★★☆</div>

                      <span className="text-sm text-gray-500">
                        4 (128 Review)
                      </span>
                    </div>

                    {/* SPECS */}

                    <div className="space-y-1 text-gray-700 mb-4">
                      <p>
                        <span className="font-semibold">Size:</span>{" "}
                        {selectedProduct?.size || "19MM"}
                      </p>

                      <p>
                        <span className="font-semibold">Length:</span> 20ft
                      </p>

                      <p>
                        <span className="font-semibold">Code:</span> CF 001
                      </p>

                      <p>
                        <span className="font-semibold">Colour:</span> Green
                      </p>

                      <p>
                        <span className="font-semibold">Material:</span> PVC
                      </p>
                    </div>

                    {/* PRICE + BUTTONS */}

                    <div className="flex flex-wrap items-center gap-6 mb-6">
                      <span className="text-2xl font-bold">
                        ₹67.00
                        <span className="text-sm font-normal text-gray-500">
                          /piece
                        </span>
                      </span>

                      <div className="flex flex-col gap-2">
                        {/* DETAIL VIEW - ADD TO CART */}

                        <button
                          onClick={() => addToCart(selectedProduct)}
                          className="
                          bg-red-500
                          text-white
                          px-6
                          py-2
                          rounded-full
                          text-sm
                          hover:bg-red-600
                          transition
                          "
                        >
                          Add to Cart
                        </button>

                        <button
                          className="
                          border
                          border-red-500
                          text-red-500
                          px-6
                          py-2
                          rounded-full
                          text-sm
                          hover:bg-red-500
                          hover:text-white
                          transition
                          "
                        >
                          Request Quote
                        </button>
                      </div>
                    </div>

                    {/* COLOR SWATCHES */}

                    <div className="flex gap-3 mb-6">
                      <button
                        onClick={() => setSelectedColor("green")}
                        className={`
                        w-8
                        h-8
                        rounded-full
                        bg-green-600
                        ${selectedColor === "green" ? "ring-2 ring-offset-2 ring-green-600" : ""}
                        `}
                      />

                      <button
                        onClick={() => setSelectedColor("black")}
                        className={`
                        w-8
                        h-8
                        rounded-full
                        bg-black
                        ${selectedColor === "black" ? "ring-2 ring-offset-2 ring-black" : ""}
                        `}
                      />

                      <button
                        onClick={() => setSelectedColor("purple")}
                        className={`
                        w-8
                        h-8
                        rounded-full
                        bg-purple-600
                        ${selectedColor === "purple" ? "ring-2 ring-offset-2 ring-purple-600" : ""}
                        `}
                      />
                    </div>

                    {/* TABS */}

                    <div className="border-b border-gray-300 mb-4 overflow-x-auto no-scrollbar">
                      <div className="flex gap-4 min-w-max">
                        {[
                          "Specifications",
                          "Datasheets",
                          "Certifications",
                          "Applications",
                        ].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                            pb-2
                            text-sm
                            font-medium
                            border-b-2
                            transition
                            whitespace-nowrap
                            ${
                              activeTab === tab
                                ? "border-red-500 text-red-500"
                                : "border-transparent text-gray-500 hover:text-black"
                            }
                            `}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* TAB CONTENT - SPECIFICATIONS */}

                    {activeTab === "Specifications" && (
                      <table className="w-full text-sm border border-gray-200">
                        <tbody>
                          {[
                            { label: "Outer Diameter (mm)", value: "110" },
                            { label: "Wall Thickness (mm)", value: "4.2" },
                            { label: "Nominal Pressure (PN)", value: "16" },
                            { label: "Standard", value: "ISO 1452-2" },
                            { label: "Tensile Strength", value: "50 MPa" },
                            { label: "Impact Strength", value: "5 kJ/m²" },
                            {
                              label: "Chemical Resistance",
                              value: "Excellent",
                            },
                          ].map((row, i) => (
                            <tr key={i} className="border-b border-gray-200">
                              <td className="py-2 px-3 text-gray-600 bg-gray-50 w-1/2">
                                {row.label}
                              </td>

                              <td className="py-2 px-3">{row.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}

                    {/* TAB CONTENT - DATASHEETS */}

                    {activeTab === "Datasheets" && (
                      <div className="text-sm text-gray-600 py-4">
                        Datasheet content will be available here.
                      </div>
                    )}

                    {/* TAB CONTENT - CERTIFICATIONS */}

                    {activeTab === "Certifications" && (
                      <div className="text-sm text-gray-600 py-4">
                        Certification details will be available here.
                      </div>
                    )}

                    {/* TAB CONTENT - APPLICATIONS */}

                    {activeTab === "Applications" && (
                      <div className="text-sm text-gray-600 py-4">
                        Application details will be available here.
                      </div>
                    )}
                  </div>
                </div>

                {/* RELATED PRODUCTS */}

                <div className="mt-16">
                  <h3 className="text-3xl font-bold mb-8">Related Products</h3>

                  <div className="relative flex items-center justify-center w-full">
                    {/* LEFT BUTTON */}

                    <button
                      className="
                      absolute
                      left-0
                      z-20
                      w-10
                      h-10
                      rounded-full
                      bg-white
                      border
                      border-gray-300
                      shadow-md
                      flex
                      items-center
                      justify-center
                      hover:bg-gray-100
                      transition
                      cursor-pointer
                      "
                    >
                      ‹
                    </button>

                    {/* PRODUCTS */}

                    <div
                      className="
                      flex
                      items-start
                      justify-center
                      gap-6
                      overflow-x-auto
                      no-scrollbar
                      w-full
                      px-16
                      py-2
                      scroll-smooth
                      "
                    >
                      {relatedProducts.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => handleViewDetails(item)}
                          className="
                          min-w-[170px]
                          max-w-[170px]
                          flex
                          flex-col
                          items-center
                          text-center
                          cursor-pointer
                          group
                          "
                        >
                          {/* IMAGE */}

                          <div
                            className="
                            w-[170px]
                            h-[150px]
                            bg-[#e5e5e5]
                            rounded-md
                            border
                            border-gray-300
                            flex
                            items-center
                            justify-center
                            overflow-hidden
                            transition
                            duration-300
                            group-hover:shadow-xl
                            "
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="
                              w-full
                              h-full
                              object-contain
                              p-3
                              transition
                              duration-300
                              group-hover:scale-105
                              "
                            />
                          </div>

                          {/* TITLE */}

                          <p
                            className="
                            mt-4
                            text-lg
                            font-medium
                            leading-snug
                            transition
                            group-hover:text-red-500
                            "
                          >
                            {item.title}
                          </p>

                          {/* PRICE */}

                          <p className="text-gray-600 text-lg mt-1">
                            {item.price || "₹67.00"}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* RIGHT BUTTON */}

                    <button
                      className="
                      absolute
                      right-0
                      z-20
                      w-10
                      h-10
                      rounded-full
                      bg-white
                      border
                      border-gray-300
                      shadow-md
                      flex
                      items-center
                      justify-center
                      hover:bg-gray-100
                      transition
                      cursor-pointer
                      "
                    >
                      ›
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ====================== */}
          {/* ALL PRODUCTS GRID VIEW */}
          {/* ====================== */}

          {!selectedProduct && (
            <section
              className="
              w-full
              bg-[#efefef]
              py-10
              "
            >
              {/* TOP IMAGE */}

              <div className="px-6 mb-10">
                <img
                  src={allProductsTop}
                  alt="All Products"
                  className="
                  w-full
                  rounded-md
                  shadow-lg
                  "
                />
              </div>

              {/* PRODUCTS */}

              <div className="max-w-7xl mx-auto flex flex-col gap-6 px-6 lg:flex-row">
                {/* MOBILE FILTER TOGGLE */}

                <div className="lg:hidden">
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="
                    flex
                    items-center
                    gap-2
                    bg-white
                    border
                    border-gray-300
                    px-4
                    py-2
                    rounded-md
                    shadow-sm
                    text-sm
                    font-semibold
                    w-full
                    justify-between
                    "
                  >
                    <span>Filters & Categories</span>
                    <span>{sidebarOpen ? "▲" : "▼"}</span>
                  </button>
                </div>

                {/* SIDEBAR */}

                <div
                  className={`
                  w-full
                  lg:w-[260px]
                  bg-white
                  p-5
                  rounded-md
                  shadow-md
                  h-fit
                  lg:block
                  ${sidebarOpen ? "block" : "hidden"}
                  `}
                >
                  <h2 className="text-xl font-bold mb-5">
                    Product Catalog & Filters
                  </h2>

                  {/* CATEGORY */}

                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-3">
                      Browse by Category
                    </h3>

                    {/* PIPE TYPE */}

                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Pipe Type</h4>

                        <span>⌃</span>
                      </div>

                      <ul className="space-y-1 text-gray-700 text-sm pl-4">
                        <li>• PVC Pipes</li>
                        <li>• UPVC Pipes</li>
                        <li>• CPVC Pipes</li>
                        <li>• HDPE Pipes</li>
                      </ul>
                    </div>

                    {/* DIAMETER */}

                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Diameter</h4>

                        <span>⌃</span>
                      </div>

                      <ul className="space-y-1 text-gray-700 text-sm pl-4">
                        <li>• 1/2 inch</li>
                        <li>• 1 inch</li>
                        <li>• 2 inch</li>
                        <li>• 4 inch</li>
                        <li>• 6+ inch</li>
                      </ul>
                    </div>

                    {/* SCHEDULE */}

                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Schedule</h4>

                        <span>⌃</span>
                      </div>

                      <ul className="space-y-1 text-gray-700 text-sm pl-4">
                        <li>• Schedule 40</li>
                        <li>• Schedule 80</li>
                        <li>• Metric</li>
                      </ul>
                    </div>

                    {/* MATERIAL */}

                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Material</h4>

                        <span>⌃</span>
                      </div>

                      <ul className="space-y-1 text-gray-700 text-sm pl-4">
                        <li>• PVC</li>
                        <li>• UPVC</li>
                        <li>• CPVC</li>
                      </ul>
                    </div>

                    {/* FITTINGS */}

                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Fittings</h4>

                        <span>⌄</span>
                      </div>

                      <ul className="space-y-1 text-gray-700 text-sm pl-4">
                        <li>• Elbows</li>
                        <li>• Tees</li>
                        <li>• Couplings</li>
                        <li>• Flanges</li>
                      </ul>
                    </div>

                    {/* REFINE SEARCH */}

                    <div className="mt-8">
                      <h3 className="font-bold text-lg mb-4">Refine Search</h3>

                      {/* SIZE */}

                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Size Range (mm)</h4>

                        <input type="range" className="w-full" />

                        <div className="flex gap-2 mt-2">
                          <input
                            type="text"
                            className="
                            w-full
                            border
                            rounded
                            px-2
                            py-1
                            text-sm
                            "
                          />

                          <input
                            type="text"
                            className="
                            w-full
                            border
                            rounded
                            px-2
                            py-1
                            text-sm
                            "
                          />
                        </div>
                      </div>

                      {/* MATERIAL */}

                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Material</h4>

                        <div className="space-y-1 text-sm">
                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            PVC
                          </label>

                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            UPVC
                          </label>

                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            CPVC
                          </label>
                        </div>
                      </div>

                      {/* APPLICATION */}

                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Application</h4>

                        <div className="space-y-1 text-sm">
                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            Plumbing
                          </label>

                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            Irrigation
                          </label>

                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            Industrial
                          </label>

                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            Drainage
                          </label>
                        </div>
                      </div>

                      {/* PRICE */}

                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Price Range ($)</h4>

                        <input type="range" className="w-full" />

                        <div className="flex gap-2 mt-2">
                          <input
                            type="text"
                            className="
                            w-full
                            border
                            rounded
                            px-2
                            py-1
                            text-sm
                            "
                          />

                          <input
                            type="text"
                            className="
                            w-full
                            border
                            rounded
                            px-2
                            py-1
                            text-sm
                            "
                          />
                        </div>
                      </div>

                      {/* CERTIFICATION */}

                      <div>
                        <h4 className="font-semibold mb-2">Certification</h4>

                        <div className="space-y-1 text-sm">
                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            ISO
                          </label>

                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            ASTM
                          </label>

                          <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            NSF
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PRODUCT GRID */}

                <div className="flex-1">
                  <h2 ref={allProductsRef} className="text-4xl font-bold mb-8">
                    All Products
                  </h2>

                  <div
                    className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-6
                    "
                  >
                    {getCurrentPageProducts().map((item, index) => (
                      <div
                        key={index}
                        className="
                        bg-white
                        rounded-md
                        overflow-hidden
                        shadow-md
                        border
                        "
                      >
                        <div className="bg-black">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="
                            w-full
                            h-[260px]
                            object-contain
                            "
                          />
                        </div>

                        <div className="p-4">
                          <h3 className="text-xl font-bold mb-3">
                            {item.title}
                          </h3>

                          <div className="space-y-1 text-gray-700">
                            <p>
                              <span className="font-semibold">Size:</span> 19MM
                            </p>
                            <p>
                              <span className="font-semibold">Length:</span>{" "}
                              20ft
                            </p>
                            <p>
                              <span className="font-semibold">Code:</span> CF001
                            </p>
                            <p>
                              <span className="font-semibold">Colour:</span>{" "}
                              Green
                            </p>
                            <p>
                              <span className="font-semibold">Material:</span>{" "}
                              PVC
                            </p>
                          </div>

                          <div className="flex gap-2 mt-5 flex-wrap">
                            <button
                              onClick={() => handleViewDetails(item)}
                              className="
                              border
                              border-red-500
                              text-red-500
                              px-3
                              py-1
                              rounded-full
                              text-sm
                              hover:bg-red-500
                              hover:text-white
                              transition
                              "
                            >
                              View Details
                            </button>

                            <button
                              className="
                              border
                              border-red-500
                              text-red-500
                              px-3
                              py-1
                              rounded-full
                              text-sm
                              hover:bg-red-500
                              hover:text-white
                              transition
                              "
                            >
                              Add to Quote
                            </button>

                            {/* GRID - ADD TO CART */}

                            <button
                              onClick={() => addToCart(item)}
                              className="
                              bg-red-500
                              text-white
                              px-3
                              py-1
                              rounded-full
                              text-sm
                              hover:bg-red-600
                              transition
                              "
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* PAGINATION */}

                  <div className="flex justify-center gap-3 mt-10">
                    {/* PREV BUTTON */}

                    <button
                      onClick={() => {
                        if (currentPage > 1) handlePageChange(currentPage - 1);
                      }}
                      disabled={currentPage === 1}
                      className="
                      w-12
                      h-12
                      border
                      bg-white
                      hover:bg-gray-200
                      disabled:opacity-40
                      disabled:cursor-not-allowed
                      "
                    >
                      &lt;
                    </button>

                    {/* PAGE 1 */}

                    <button
                      onClick={() => handlePageChange(1)}
                      className={`
                      w-12
                      h-12
                      border
                      ${currentPage === 1 ? "bg-red-500 text-white" : "bg-white hover:bg-gray-200"}
                      `}
                    >
                      1
                    </button>

                    {/* PAGE 2 */}

                    <button
                      onClick={() => handlePageChange(2)}
                      className={`
                      w-12
                      h-12
                      border
                      ${currentPage === 2 ? "bg-red-500 text-white" : "bg-white hover:bg-gray-200"}
                      `}
                    >
                      2
                    </button>

                    {/* PAGE 3 */}

                    <button
                      onClick={() => handlePageChange(3)}
                      className={`
                      w-12
                      h-12
                      border
                      ${currentPage === 3 ? "bg-red-500 text-white" : "bg-white hover:bg-gray-200"}
                      `}
                    >
                      3
                    </button>

                    {/* NEXT BUTTON */}

                    <button
                      onClick={() => {
                        if (currentPage < 3) handlePageChange(currentPage + 1);
                      }}
                      disabled={currentPage === 3}
                      className="
                      w-12
                      h-12
                      border
                      bg-white
                      hover:bg-gray-200
                      disabled:opacity-40
                      disabled:cursor-not-allowed
                      "
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
