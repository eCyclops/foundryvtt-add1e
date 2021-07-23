// Import Modules
import { ADD1eItemSheet } from "./module/item/item-sheet.js";
import { ADD1eActorSheetCharacter } from "./module/actor/character-sheet.js";
import { ADD1eActorSheetMonster } from "./module/actor/monster-sheet.js";
import { preloadHandlebarsTemplates } from "./module/preloadTemplates.js";
import { ADD1eActor } from "./module/actor/entity.js";
import { ADD1eItem } from "./module/item/entity.js";
import { ADD1E } from "./module/config.js";
import { registerSettings } from "./module/settings.js";
import { registerHelpers } from "./module/helpers.js";
import * as chat from "./module/chat.js";
import * as treasure from "./module/treasure.js";
import * as macros from "./module/macros.js";
import * as party from "./module/party.js";
import { ADD1eCombat } from "./module/combat.js";
import * as renderList from "./module/renderList.js";

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", async function () {
  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d6 + @initiative.value",
    decimals: 2,
  };

  CONFIG.ADD1E = ADD1E;

  game.add1e = {
    rollItemMacro: macros.rollItemMacro,
  };

  // Custom Handlebars helpers
  registerHelpers();

  // Register custom system settings
  registerSettings();

  CONFIG.Actor.documentClass = ADD1eActor;
  CONFIG.Item.documentClass = ADD1eItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("add1e", ADD1eActorSheetCharacter, {
    types: ["character"],
    makeDefault: true,
    label: "ADD1E.SheetClassCharacter"
  });
  Actors.registerSheet("add1e", ADD1eActorSheetMonster, {
    types: ["monster"],
    makeDefault: true,
    label: "ADD1E.SheetClassMonster"
  });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("add1e", ADD1eItemSheet, {
    makeDefault: true,
    label: "ADD1E.SheetClassItem"
  });

  await preloadHandlebarsTemplates();
});

/**
 * This function runs after game data has been requested and loaded from the servers, so entities exist
 */
Hooks.once("setup", function () {
  // Localize CONFIG objects once up-front
  const toLocalize = ["saves_short", "saves_long", "scores", "armor", "colors", "tags"];
  for (let o of toLocalize) {
    CONFIG.ADD1E[o] = Object.entries(CONFIG.ADD1E[o]).reduce((obj, e) => {
      obj[e[0]] = game.i18n.localize(e[1]);
      return obj;
    }, {});
  }

  // Custom languages
  const languages = game.settings.get("add1e", "languages");
  if (languages != "") {
    const langArray = languages.split(',');
    langArray.forEach((l, i) => langArray[i] = l.trim())
    CONFIG.ADD1E.languages = langArray;
  }
});

Hooks.once("ready", async () => {
  Hooks.on("hotbarDrop", (bar, data, slot) =>
    macros.createADD1eMacro(data, slot)
  );
});

// License and KOFI infos
Hooks.on("renderSidebarTab", async (object, html) => {
  if (object instanceof ActorDirectory) {
    party.addControl(object, html);
  }
  if (object instanceof Settings) {
    let gamesystem = html.find("#game-details");
    // SRD Link
    let add1e = gamesystem.find('h4').last();
    add1e.append(` <sub><a href="https://oldschoolessentials.necroticgnome.com/srd/index.php">SRD<a></sub>`);

    // License text
    const template = "systems/add1e/templates/chat/license.html";
    const rendered = await renderTemplate(template);
    gamesystem.find(".system").append(rendered);

    // User guide
    let docs = html.find("button[data-action='docs']");
    const styling = "border:none;margin-right:2px;vertical-align:middle;margin-bottom:5px";
    $(`<button data-action="userguide"><img src='/systems/add1e/assets/dragon.png' width='16' height='16' style='${styling}'/>Old School Guide</button>`).insertAfter(docs);
    html.find('button[data-action="userguide"]').click(ev => {
      new FrameViewer('https://ecyclops.github.com/foundryvtt-add1e', { resizable: true }).render(true);
    });
  }
});

Hooks.on("preCreateCombatant", (combat, data, options, id) => {
  let init = game.settings.get("add1e", "initiative");
  if (init == "group") {
    ADD1eCombat.addCombatant(combat, data, options, id);
  }
});

Hooks.on("updateCombatant", ADD1eCombat.updateCombatant);
Hooks.on("renderCombatTracker", ADD1eCombat.format);
Hooks.on("preUpdateCombat", ADD1eCombat.preUpdateCombat);
Hooks.on("getCombatTrackerEntryContext", ADD1eCombat.addContextEntry);

Hooks.on("renderChatLog", (app, html, data) => ADD1eItem.chatListeners(html));
Hooks.on("getChatLogEntryContext", chat.addChatMessageContextOptions);
Hooks.on("renderChatMessage", chat.addChatMessageButtons);
Hooks.on("renderRollTableConfig", treasure.augmentTable);
Hooks.on("updateActor", party.update);

Hooks.on("renderCompendium", renderList.RenderCompendium);
Hooks.on("renderSidebarDirectory", renderList.RenderDirectory);
