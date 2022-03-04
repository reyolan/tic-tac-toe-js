import { startGameEvent } from "./start-game.js";
import { inGameEvent } from "./game.js";
import { returnEvent } from "./return.js";
import { undoRedoEvent } from "./history.js";
import { showMoveListEvent } from "./move-list.js";

startGameEvent();
inGameEvent();
returnEvent();
undoRedoEvent();
showMoveListEvent();
