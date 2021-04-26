import { PersistentStore } from "../types/index";

interface Data extends Object {
    colSize: string
}

class GeneralStore extends PersistentStore<Object> {
    protected data(): Data {
        return {
            colSize: '200px 7px 43% 7px 1fr'
        };
    }

    getColSize (): string {
        return this.state.colSize;
    }

    setColSize (colSize: string): void {
        this.state.colSize = colSize;
    }
}

export const generalStore = new GeneralStore('hydra_general_store');