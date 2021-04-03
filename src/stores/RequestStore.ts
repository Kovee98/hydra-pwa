import { PersistentStore, Request } from "../types/index";

interface Data extends Object {
    currRequest: Request,
    requests: Object
}

class RequestStore extends PersistentStore<Object> {
    protected data(): Data {
        return {
            currRequest: {
                name: '',
                method: 'get',
                url: '',
                body: '',
                response: ''
            },
            requests: {}
        };
    }

    get requests (): Array<Request> {
        return Object.values(this.state.requests);
    }

    get currRequest () {
        return this.state.currRequest;
    }

    set currRequest (request: Request) {
        this.state.currRequest = request;
    }

    getRequest (id: number): Request {
        return this.state.requests[id];
    }

    saveRequest (request: Request) {
        this.state.requests[request.id] = request;
    }

    removeRequest (id: number) {
        delete this.state.requests[id];
    }

    getNextId (): number {
        const requests = Object.values(this.state.requests);

        if (requests.length <= 0) return 0;

        requests.sort((request1: Request, request2: Request) => request2.id - request1.id);

        return requests[0].id + 1;
    }
}

export const requestStore = new RequestStore('hydra_request_store');