import { startGameEvent } from "./start-game.js";
import { inGameEvent } from "./game.js";
import { returnEvent } from "./return.js";
import { undoRedoEvent } from "./history.js";

startGameEvent();
inGameEvent();
returnEvent();
undoRedoEvent();
