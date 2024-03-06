declare namespace ICountry {
  interface ICountry {
    flags: Flags;
    name: Name;
    cca2: string;
    cca3: string;
    idd: Idd;
    altSpellings: string[];
  }

  interface Idd {
    root: string;
    suffixes: string[];
  }

  interface Name {
    common: string;
    official: string;
    nativeName: NativeName;
  }

  interface NativeName {
    ell?: Ell;
    tur?: Ell;
    ara?: Ell;
    eng?: Ell;
    tir?: Ell;
    ita?: Ell;
    lat?: Ell;
    rar?: Ell;
    som?: Ell;
    spa?: Ell;
    rus?: Ell;
    tuk?: Ell;
    sqi?: Ell;
    hrv?: Ell;
    por?: Ell;
    tet?: Ell;
    fra?: Ell;
    kon?: Ell;
    lin?: Ell;
    aze?: Ell;
    swa?: Ell;
    smo?: Ell;
    vie?: Ell;
    prs?: Ell;
    pus?: Ell;
    lav?: Ell;
    kir?: Ell;
    pol?: Ell;
    cha?: Ell;
    lit?: Ell;
    hye?: Ell;
    nrf?: Ell;
    tgk?: Ell;
    amh?: Ell;
    ber?: Ell;
    mey?: Ell;
    mri?: Ell;
    nzs?: Ell;
    msa?: Ell;
    niu?: Ell;
    ron?: Ell;
    nor?: Ell;
    bel?: Ell;
    ces?: Ell;
    slk?: Ell;
    urd?: Ell;
    aym?: Ell;
    que?: Ell;
    kal?: Ell;
    hun?: Ell;
    zdj?: Ell;
    ben?: Ell;
    tkl?: Ell;
    fij?: Ell;
    hif?: Ell;
    zho?: Ell;
    div?: Ell;
    gle?: Ell;
    est?: Ell;
    grn?: Ell;
    afr?: Ell;
    nbl?: Ell;
    nso?: Ell;
    sot?: Ell;
    ssw?: Ell;
    tsn?: Ell;
    tso?: Ell;
    ven?: Ell;
    xho?: Ell;
    zul?: Ell;
    bis?: Ell;
    fin?: Ell;
    swe?: Ell;
    pih?: Ell;
    bjz?: Ell;
    mon?: Ell;
    tvl?: Ell;
    nep?: Ell;
    bul?: Ell;
    glv?: Ell;
    dzo?: Ell;
    khm?: Ell;
    hat?: Ell;
    kat?: Ell;
    run?: Ell;
    mfe?: Ell;
    nya?: Ell;
    hmo?: Ell;
    tpi?: Ell;
    deu?: Ell;
    heb?: Ell;
    tam?: Ell;
    ton?: Ell;
    nld?: Ell;
    uzb?: Ell;
    mlg?: Ell;
    mah?: Ell;
    crs?: Ell;
    jpn?: Ell;
    cat?: Ell;
    fas?: Ell;
    mlt?: Ell;
    kor?: Ell;
    jam?: Ell;
    dan?: Ell;
    fil?: Ell;
    bar?: Ell;
    pov?: Ell;
    her?: Ell;
    hgm?: Ell;
    kwn?: Ell;
    loz?: Ell;
    ndo?: Ell;
    bos?: Ell;
    srp?: Ell;
    cnr?: Ell;
    cal?: Ell;
    ukr?: Ell;
    arc?: Ell;
    ckb?: Ell;
    fao?: Ell;
    gil?: Ell;
    kaz?: Ell;
    isl?: Ell;
    pau?: Ell;
    gsw?: Ell;
    roh?: Ell;
    mya?: Ell;
    tha?: Ell;
    pap?: Ell;
    lao?: Ell;
    hin?: Ell;
    ltz?: Ell;
    sag?: Ell;
    nfr?: Ell;
    nno?: Ell;
    nob?: Ell;
    smi?: Ell;
    bwg?: Ell;
    kck?: Ell;
    khi?: Ell;
    ndc?: Ell;
    nde?: Ell;
    sna?: Ell;
    toi?: Ell;
    zib?: Ell;
    slv?: Ell;
    lua?: Ell;
    ind?: Ell;
    nau?: Ell;
    kin?: Ell;
    mkd?: Ell;
    sin?: Ell;
  }

  interface Ell {
    official: string;
    common: string;
  }

  interface Flags {
    png: string;
    svg: string;
    alt: string;
  }
}
