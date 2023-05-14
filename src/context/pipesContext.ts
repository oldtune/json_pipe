import { createContext } from "react";
import { Pipe } from "../types/pipe";

export const AppContext = createContext<Pipe[]>([]);