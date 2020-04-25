////////////////////////////////////////////////////////
//              DO NOT CHANGE THIS FILE               //
////////////////////////////////////////////////////////

import fs from "fs"
import path from "path"
import pegjs from "pegjs"


export default function loadGrammar() {
  let grammarFileName = path.join("./src/", "grammar.pegjs")
  let grammarSrc = fs.readFileSync(grammarFileName, "utf-8")

    return pegjs.generate(grammarSrc, { trace: false })

}
