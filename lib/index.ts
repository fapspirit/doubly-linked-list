export class DoublyLinkedListNode<T> {
    protected _list: DoublyLinkedList<T> | undefined;
    protected _prev: DoublyLinkedListNode<T> | undefined;
    protected _next: DoublyLinkedListNode<T> | undefined;

    constructor(protected _value: T) {
        this._list = undefined;
        this._prev = undefined;
        this._next = undefined;
    }

    public get isTail() {
        return this._next === undefined;
    }

    public get isHead() {
        return this._prev === undefined;
    }

    public get prev() {
        return this._prev;
    }

    public set prev(node: DoublyLinkedListNode<T> | undefined) {
        if (node !== undefined && !(node instanceof DoublyLinkedListNode)) {
            throw new Error(
                'DoublyLinkedListNode#prev: passed node is not instance of DoublyLinkedListNode or undefined',
            );
        }

        this._prev = node;
    }

    public get next() {
        return this._next;
    }

    public set next(node: DoublyLinkedListNode<T> | undefined) {
        if (node !== undefined && !(node instanceof DoublyLinkedListNode)) {
            throw new Error(
                'DoublyLinkedListNode#next: passed node is not instance of DoublyLinkedListNode or undefined',
            );
        }

        this._next = node;
    }

    public get value() {
        return this._value;
    }

    public set value(value: T) {
        this._value = value;
    }

    public get list() {
        return this._list;
    }

    public set list(list: DoublyLinkedList<T> | undefined) {
        //eslint-disable-next-line @typescript-eslint/no-use-before-define
        if (list !== undefined && !(list instanceof DoublyLinkedList)) {
            throw new Error('DoublyLinkedListNode#list: passed node is not instance of DoublyLinkedList or undefined');
        }

        this._list = list;
    }
}

export class DoublyLinkedList<T> {
    protected _head: DoublyLinkedListNode<T> | undefined;
    protected _tail: DoublyLinkedListNode<T> | undefined;
    protected _length: number;

    constructor() {
        this._length = 0;
        this._head = undefined;
        this._tail = undefined;
    }

    public static fromArray<T>(array: T[]) {
        const list = new DoublyLinkedList<T>();

        list.push(...array);

        return list;
    }

    public get length() {
        return this._length;
    }

    public get head() {
        return this._head;
    }

    public get tail() {
        return this._tail;
    }

    // Core methods
    public push(...values: T[]) {
        const nodes = values.map(value => new DoublyLinkedListNode<T>(value));

        return this.pushNode(...nodes);
    }

    public pushNode(...nodes: DoublyLinkedListNode<T>[]) {
        for (const node of nodes) {
            this._appendNode(node);
        }

        return this._length;
    }

    protected _appendNode(node: DoublyLinkedListNode<T>) {
        if (!(node instanceof DoublyLinkedListNode)) {
            throw new Error('DoublyLinkedList#push: passed node is not instance of DoublyLinkedListNode');
        }

        if (this._length === 0) {
            this._head = node;
            node.prev = undefined;
        } else {
            this._tail.next = node;
            node.prev = this._tail;
        }

        node.next = undefined;

        this._tail = node;
        node.list = this;

        this._length++;
    }

    public pop() {
        const node = this.popNode();

        return node === undefined ? undefined : node.value;
    }

    public popNode(): DoublyLinkedListNode<T> | undefined {
        if (this._length === 0) {
            return undefined;
        }

        const oldTail = this._tail;
        const newTail = oldTail.prev;

        this._tail = newTail;
        newTail.next = undefined;
        oldTail.list = undefined;

        this._length--;

        return oldTail;
    }

    public unshift(...values: T[]) {
        const nodes = values.map(value => new DoublyLinkedListNode<T>(value));

        return this.unshiftNode(...nodes);
    }

    public unshiftNode(...nodes: DoublyLinkedListNode<T>[]) {
        for (const node of nodes.reverse()) {
            this._prependNode(node);
        }

        return this._length;
    }

    protected _prependNode(node: DoublyLinkedListNode<T>) {
        if (!(node instanceof DoublyLinkedListNode)) {
            throw new Error('DoublyLinkedList#unshift: passed node is not instance of DoublyLinkedListNode');
        }

        if (this._length === 0) {
            this._tail = node;
            node.next = undefined;
        } else {
            node.next = this._head;
            this._head.prev = node;
        }

        node.prev = undefined;

        this._head = node;
        node.list = this;

        this._length++;
    }

    public shift() {
        const node = this.shiftNode();

        return node === undefined ? undefined : node.value;
    }

    public shiftNode(): DoublyLinkedListNode<T> | undefined {
        if (this._length === 0) {
            return undefined;
        }

        const oldHead = this._head;
        const newHead = oldHead.next;

        this._head = newHead;
        newHead.prev = undefined;
        oldHead.list = undefined;

        this._length--;

        return oldHead;
    }

    // Custom methods
    public get(index: number): T | undefined {
        const node = this.getNode(index);

        return node === undefined ? undefined : node.value;
    }

    public getNode(index: number): DoublyLinkedListNode<T> | undefined {
        if (Number.isNaN(index) || typeof index !== 'number') {
            throw new TypeError(`DoublyLinkedList#get: expected number, got ${typeof index}`);
        }

        let currentIndex = 0;

        if (index < 0 || index >= this._length) {
            return undefined;
        }

        for (const node of this.nodes()) {
            if (currentIndex === index) {
                return node;
            }
            currentIndex++;
        }
    }

    public move(from: number, to: number) {
        if (from === to || from < 0 || from >= this._length || to < 0 || to >= this._length) {
            return;
        }

        const originalLength = this._length;

        const movableNode = this.ejectNode(from);

        if (to === originalLength - 1) {
            this._appendNode(movableNode);
        } else if (to === 0) {
            this._prependNode(movableNode);
        } else {
            const destinationNode = this.getNode(to);
            this._insertNodeBefore(movableNode, destinationNode);
        }
    }

    public ejectNode(index: number) {
        const node = this._ejectNodeByIndex(index);

        return node;
    }

    private _ejectNodeByIndex(index: number) {
        const node = this.getNode(index);

        if (node === undefined) {
            return;
        }

        const prevNode = node.prev;
        const nextNode = node.next;

        if (!node.isHead) {
            prevNode.next = nextNode;
        } else {
            this._head = node.next;
        }

        if (!node.isTail) {
            nextNode.prev = prevNode;
        } else {
            this._tail = node.prev;
        }

        node.list = undefined;
        node.prev = undefined;
        node.next = undefined;

        this._length--;

        return node;
    }

    private _insertNodeBefore(node: DoublyLinkedListNode<T>, destinationNode: DoublyLinkedListNode<T>) {
        node.list = this;

        node.prev = destinationNode.prev;

        if (destinationNode.prev) {
            destinationNode.prev.next = node;
        }

        node.next = destinationNode;
        destinationNode.prev = node;

        this._length++;

        return node;
    }

    public *values() {
        for (const node of this.nodes()) {
            yield node.value;
        }
    }

    public *nodes() {
        let nextValue = this._head;

        while (nextValue !== undefined) {
            yield nextValue;
            nextValue = nextValue.next;
        }
    }

    public toArray() {
        return [...this.values()];
    }

    public toNodesArray() {
        return [...this.nodes()];
    }
}
