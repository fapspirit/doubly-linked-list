import { assert } from 'chai';
import { DoublyLinkedList, DoublyLinkedListNode } from '../lib/index';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
function isIterable(value) {
    assert.isNotNull(value, `${value} is not iterable`);
    assert.notStrictEqual(value, null, `${value} is not iterable`);

    return assert.strictEqual(typeof value[Symbol.iterator], 'function', `${value} is not iterable`);
}

describe('DoublyLinkedList', () => {
    describe('.constructor', () => {
        it('should create empty list', () => {
            const list = new DoublyLinkedList();

            assert.ok(list);
            assert.strictEqual(list.length, 0);
        });
    });

    describe('.fromArray', () => {
        it('should return DoublyLinkedList filled with items from array', () => {
            const values = [1, 2, 3];
            const list = DoublyLinkedList.fromArray(values);

            assert.ok(list);
            assert.strictEqual(list.length, 3);
            assert.deepStrictEqual(values, list.toArray());
        });

        it('should return empty DoublyLinkedList when empty array passed', () => {
            const values: number[] = [];
            const list = DoublyLinkedList.fromArray(values);

            assert.ok(list);
            assert.strictEqual(list.length, 0);
        });
    });

    describe('.push', () => {
        it('should return new length', () => {
            const list = new DoublyLinkedList<number>();
            const expected = 3;

            list.push(1, 2, 3);

            const actual = list.length;

            assert.strictEqual(actual, expected);
        });

        it('should add nodes at the end', () => {
            const list = new DoublyLinkedList<number>();

            list.push(1);

            assert.strictEqual(list.head, list.tail);

            assert.ok(list.head, 'head node is not assigned');
            assert.strictEqual(list.head.prev, undefined, 'head node should not have pointer to prev node');
            assert.strictEqual(list.head.next, undefined, 'head node should not have pointer to next node');
            assert.strictEqual(list.head.value, 1, 'head node has incorrect value');

            assert.ok(list.tail, 'tail node is not assigned');
            assert.strictEqual(list.tail.prev, undefined, 'tail node should not have pointer to prev node');
            assert.strictEqual(list.tail.next, undefined, 'tail node should not have pointer to next node');
            assert.strictEqual(list.tail.value, 1, 'tail node has incorrect value');
        });

        it('should correctly reassign pointers on nodes', () => {
            const list = new DoublyLinkedList<number>();

            list.push(1, 2);

            assert.strictEqual(list.head.next, list.tail);
            assert.strictEqual(list.tail.prev, list.head);
            assert.notStrictEqual(list.head, list.tail);

            assert.ok(list.head, 'head node is not assigned');
            assert.strictEqual(list.head.prev, undefined, 'head node should not have pointer to prev node');
            assert.ok(list.head.next, 'head node should have pointer to next node');
            assert.strictEqual(list.head.value, 1, 'head node has incorrect value');

            assert.ok(list.tail, 'tail node is not assigned');
            assert.ok(list.tail.prev, 'tail node should have pointer to prev node');
            assert.strictEqual(list.tail.next, undefined, 'tail node should not have pointer to next node');
            assert.strictEqual(list.tail.value, 2, 'tail node has incorrect value');
        });
    });

    describe('.pushNode', () => {
        it('should return new length', () => {
            const list = new DoublyLinkedList<number>();
            const node1 = new DoublyLinkedListNode<number>(1);
            const node2 = new DoublyLinkedListNode<number>(2);

            const expected = 2;

            const actual = list.pushNode(node1, node2);

            assert.strictEqual(actual, expected);
        });

        it('should throw an error when passed anything except node', () => {
            const list = new DoublyLinkedList();

            const expected = 'DoublyLinkedList#push: passed node is not instance of DoublyLinkedListNode';

            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            assert.throws(() => list.pushNode(1), expected);
        });
    });

    describe('.pop', () => {
        it('should return last value', () => {
            const list = new DoublyLinkedList<number>();
            const expected = 2;

            list.push(1, 2);

            const actual = list.pop();

            assert.strictEqual(actual, expected);
        });

        it('should decrement the length of the list', () => {
            const list = new DoublyLinkedList<number>();
            const expected = 1;

            list.push(1, 2);

            list.pop();

            const actual = list.length;

            assert.strictEqual(actual, expected);
        });

        it('should return undefined when no items in list', () => {
            const list = new DoublyLinkedList<number>();

            const actual = list.pop();

            assert.strictEqual(actual, undefined);
        });
    });

    describe('.popNode', () => {
        it('should correctly reassign pointers to new tail', () => {
            const list = DoublyLinkedList.fromArray([1, 2, 3]);

            list.popNode();

            assert.strictEqual(list.head.next, list.tail);
            assert.strictEqual(list.tail.prev, list.head);
            assert.notStrictEqual(list.head, list.tail);

            assert.ok(list.head, 'head node is not assigned');
            assert.strictEqual(list.head.prev, undefined, 'head node should not have pointer to prev node');
            assert.ok(list.head.next, 'head node should have pointer to next node');
            assert.strictEqual(list.head.value, 1, 'head node has incorrect value');

            assert.ok(list.tail, 'tail node is not assigned');
            assert.ok(list.tail.prev, 'tail node should have pointer to prev node');
            assert.strictEqual(list.tail.next, undefined, 'tail node should not have pointer to next node');
            assert.strictEqual(list.tail.value, 2, 'tail node has incorrect value');
        });
    });

    describe('.unshift', () => {
        it('should return new length', () => {
            const list = new DoublyLinkedList<number>();
            const expected = 3;

            list.unshift(1, 2, 3);

            const actual = list.length;

            assert.strictEqual(actual, expected);
        });

        it('should add nodes at the end', () => {
            const list = new DoublyLinkedList<number>();

            list.unshift(1);

            assert.strictEqual(list.head, list.tail);

            assert.ok(list.head, 'head node is not assigned');
            assert.strictEqual(list.head.prev, undefined, 'head node should not have pointer to prev node');
            assert.strictEqual(list.head.next, undefined, 'head node should not have pointer to next node');
            assert.strictEqual(list.head.value, 1, 'head node has incorrect value');

            assert.ok(list.tail, 'tail node is not assigned');
            assert.strictEqual(list.tail.prev, undefined, 'tail node should not have pointer to prev node');
            assert.strictEqual(list.tail.next, undefined, 'tail node should not have pointer to next node');
            assert.strictEqual(list.tail.value, 1, 'tail node has incorrect value');
        });

        it('should correctly reassign pointers on nodes', () => {
            const list = new DoublyLinkedList<number>();

            list.unshift(1, 2);

            assert.strictEqual(list.head.next, list.tail);
            assert.strictEqual(list.tail.prev, list.head);
            assert.notStrictEqual(list.head, list.tail);

            assert.ok(list.head, 'head node is not assigned');
            assert.strictEqual(list.head.prev, undefined, 'head node should not have pointer to prev node');
            assert.ok(list.head.next, 'head node should have pointer to next node');
            assert.strictEqual(list.head.value, 1, 'head node has incorrect value');

            assert.ok(list.tail, 'tail node is not assigned');
            assert.ok(list.tail.prev, 'tail node should have pointer to prev node');
            assert.strictEqual(list.tail.next, undefined, 'tail node should not have pointer to next node');
            assert.strictEqual(list.tail.value, 2, 'tail node has incorrect value');
        });
    });

    describe('.unshiftNode', () => {
        it('should return new length', () => {
            const list = new DoublyLinkedList<number>();
            const node1 = new DoublyLinkedListNode<number>(1);
            const node2 = new DoublyLinkedListNode<number>(2);

            const expected = 2;

            const actual = list.unshiftNode(node1, node2);

            assert.strictEqual(actual, expected);
        });

        it('should throw an error when passed anything except node', () => {
            const list = new DoublyLinkedList();

            const expected = 'DoublyLinkedList#unshift: passed node is not instance of DoublyLinkedListNode';

            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            assert.throws(() => list.unshiftNode(1), expected);
        });
    });

    describe('.shift', () => {
        it('should return fisr value', () => {
            const list = new DoublyLinkedList<number>();
            const expected = 1;

            list.push(1, 2);

            const actual = list.shift();

            assert.strictEqual(actual, expected);
        });

        it('should decrement the length of the list', () => {
            const list = new DoublyLinkedList<number>();
            const expected = 2;

            list.push(1, 2, 3);

            list.shift();

            const actual = list.length;

            assert.strictEqual(actual, expected);
        });

        it('should return undefined when no items in list', () => {
            const list = new DoublyLinkedList<number>();

            const actual = list.shift();

            assert.strictEqual(actual, undefined);
        });
    });

    describe('.shiftNode', () => {
        it('should correctly reassign pointers to new tail', () => {
            const list = DoublyLinkedList.fromArray([1, 2, 3]);

            list.shift();

            assert.strictEqual(list.head.next, list.tail);
            assert.strictEqual(list.tail.prev, list.head);
            assert.notStrictEqual(list.head, list.tail);

            assert.ok(list.head, 'head node is not assigned');
            assert.strictEqual(list.head.prev, undefined, 'head node should not have pointer to prev node');
            assert.ok(list.head.next, 'head node should have pointer to next node');
            assert.strictEqual(list.head.value, 2, 'head node has incorrect value');

            assert.ok(list.tail, 'tail node is not assigned');
            assert.ok(list.tail.prev, 'tail node should have pointer to prev node');
            assert.strictEqual(list.tail.next, undefined, 'tail node should not have pointer to next node');
            assert.strictEqual(list.tail.value, 3, 'tail node has incorrect value');
        });
    });

    describe('.get', () => {
        it('should return undefined when out of range', () => {
            const list = new DoublyLinkedList<number>();

            const actual = list.get(1);

            assert.strictEqual(actual, undefined);
        });

        it('should return value at passed index', () => {
            const list = DoublyLinkedList.fromArray([1, 2, 3]);
            const expected = 2;

            const actual = list.get(1);

            assert.strictEqual(actual, expected);
        });

        it('should throw an error when passed not a number', () => {
            const list = new DoublyLinkedList<number>();

            const expected = 'DoublyLinkedList#get: expected number, got string';

            assert.throws(
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                () => list.get('1'),
                expected,
            );
        });
    });

    describe('.getNode', () => {
        it('should return undefined when out of range', () => {
            const list = new DoublyLinkedList<number>();

            const actual = list.getNode(1);

            assert.strictEqual(actual, undefined);
        });

        it('should return node at passed index', () => {
            const list = DoublyLinkedList.fromArray([1, 2, 3]);
            const node = new DoublyLinkedListNode(4);
            list.pushNode(node);
            list.push(5);

            const expected = node;

            const actual = list.getNode(3);

            assert.instanceOf(expected, DoublyLinkedListNode);
            assert.deepStrictEqual(actual, expected);
        });

        it('should throw an error when passed not a number', () => {
            const list = new DoublyLinkedList<number>();

            const expected = 'DoublyLinkedList#get: expected number, got string';

            assert.throws(
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                () => list.getNode('1'),
                expected,
            );
        });
    });

    describe('.move', () => {
        it('should correctly move node from left to right', () => {
            const list = DoublyLinkedList.fromArray([1, 2, 3, 4, 5]);
            const expected = [1, 3, 4, 2, 5];

            list.move(1, 3);

            const actual = list.toArray();

            assert.strictEqual(list.length, 5);
            assert.deepStrictEqual(expected, actual);
        });

        it('should correctly move node from left to tail', () => {
            const list = DoublyLinkedList.fromArray([1, 2, 3, 4, 5]);
            const expected = [1, 3, 4, 5, 2];

            list.move(1, 4);

            const actual = list.toArray();

            assert.strictEqual(list.length, 5);
            assert.deepStrictEqual(expected, actual);
        });

        it('should correctly move node from right to left', () => {
            const list = DoublyLinkedList.fromArray([1, 2, 3, 4, 5]);
            const expected = [1, 4, 2, 3, 5];

            list.move(3, 1);

            const actual = list.toArray();

            assert.strictEqual(list.length, 5);
            assert.deepStrictEqual(expected, actual);
        });

        it('should correctly move node from right to head', () => {
            const list = DoublyLinkedList.fromArray([1, 2, 3, 4, 5]);
            const expected = [4, 1, 2, 3, 5];

            list.move(3, 0);

            const actual = list.toArray();

            assert.strictEqual(list.length, 5);
            assert.deepStrictEqual(expected, actual);
        });

        it('should correctly move node from head to tail', () => {
            const list = DoublyLinkedList.fromArray([1, 2, 3, 4, 5]);
            const expected = [2, 3, 4, 5, 1];

            list.move(0, 4);

            const actual = list.toArray();

            assert.strictEqual(list.length, 5);
            assert.deepStrictEqual(expected, actual);
        });

        it('should correctly move node from tail to head', () => {
            const list = DoublyLinkedList.fromArray([1, 2, 3, 4, 5]);
            const expected = [5, 1, 2, 3, 4];

            list.move(4, 0);

            const actual = list.toArray();

            assert.strictEqual(list.length, 5);
            assert.deepStrictEqual(expected, actual);
        });

        it('should correctly move node from head to tail when only tail and head presented', () => {
            const list = DoublyLinkedList.fromArray([1, 2]);
            const expected = [2, 1];

            list.move(0, 1);

            const actual = list.toArray();

            assert.strictEqual(list.length, 2);
            assert.deepStrictEqual(expected, actual);
        });

        it('should correctly move node from tail to head when only tail and head presented', () => {
            const list = DoublyLinkedList.fromArray([1, 2]);
            const expected = [2, 1];

            list.move(1, 0);

            const actual = list.toArray();

            assert.strictEqual(list.length, 2);
            assert.deepStrictEqual(expected, actual);
        });

        it('should do nothing when destination are same', () => {
            const list = DoublyLinkedList.fromArray([1, 2, 3, 4]);
            const expected = [1, 2, 3, 4];

            list.move(2, 2);

            const actual = list.toArray();

            assert.deepStrictEqual(expected, actual);
        });

        it('should do nothing when from index out of range', () => {
            const list = DoublyLinkedList.fromArray([1, 2, 3, 4]);
            const expected = [1, 2, 3, 4];

            list.move(5, 2);

            const actual = list.toArray();

            assert.deepStrictEqual(expected, actual);
        });

        it('should do nothing when to index out of range', () => {
            const list = DoublyLinkedList.fromArray([1, 2, 3, 4]);
            const expected = [1, 2, 3, 4];

            list.move(2, 6);

            const actual = list.toArray();

            assert.deepStrictEqual(expected, actual);
        });

        it('should do nothing when both indexes out of range', () => {
            const list = DoublyLinkedList.fromArray([1, 2, 3, 4]);
            const expected = [1, 2, 3, 4];

            list.move(-1, 6);

            const actual = list.toArray();

            assert.deepStrictEqual(expected, actual);
        });
    });

    describe('.values', () => {
        it('should return an iterator', () => {
            const list = new DoublyLinkedList<number>();

            isIterable(list.values());
        });

        it('should not iterate when no values in list', () => {
            const list = new DoublyLinkedList<number>();

            const expected = 0;
            let counter = 0;

            list.head;

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            for (const _ of list.values()) {
                counter++;
            }

            const actual = counter;

            assert.strictEqual(actual, expected);
        });

        it('should iterate on all values', () => {
            const list = new DoublyLinkedList<number>();

            list.push(1, 2, 3);

            const expected = 3;
            let counter = 0;

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            for (const _ of list.values()) {
                counter++;
            }

            const actual = counter;

            assert.strictEqual(actual, expected);
        });
    });

    describe('.nodes', () => {
        it('should return an iterator', () => {
            const list = new DoublyLinkedList<number>();

            isIterable(list.nodes());
        });

        it('should not iterate when no nodes in list', () => {
            const list = new DoublyLinkedList<number>();

            const expected = 0;
            let counter = 0;

            list.head;

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            for (const _ of list.nodes()) {
                counter++;
            }

            const actual = counter;

            assert.strictEqual(actual, expected);
        });

        it('should iterate on all nodes', () => {
            const list = new DoublyLinkedList<number>();

            list.push(1, 2, 3);

            const expected = 3;
            let counter = 0;

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            for (const _ of list.nodes()) {
                counter++;
            }

            const actual = counter;

            assert.strictEqual(actual, expected);
        });
    });

    describe('.toArray', () => {
        it('should return an array', () => {
            const list = new DoublyLinkedList<number>();

            assert.isArray(list.toArray());
        });

        it('should return empty array when no values in list', () => {
            const list = new DoublyLinkedList<number>();

            const expected: number[] = [];

            const actual = list.toArray();

            assert.deepStrictEqual(actual, expected);
        });

        it('should return an array with all the values', () => {
            const list = new DoublyLinkedList<number>();

            list.push(1, 2, 3);

            const expected = [1, 2, 3];

            const actual = list.toArray();

            assert.deepStrictEqual(actual, expected);
        });
    });

    describe('.toNodesArray', () => {
        it('should return an array', () => {
            const list = new DoublyLinkedList<number>();

            assert.isArray(list.toNodesArray());
        });

        it('should return empty array when no nodes in list', () => {
            const list = new DoublyLinkedList<number>();

            const expected: DoublyLinkedListNode<number>[] = [];

            const actual = list.toNodesArray();

            assert.deepStrictEqual(actual, expected);
        });

        it('should return an array with all the nodes', () => {
            const list = new DoublyLinkedList<number>();
            const node1 = new DoublyLinkedListNode<number>(1);
            const node2 = new DoublyLinkedListNode<number>(2);

            const expected = [node1, node2];

            list.pushNode(node1, node2);

            const actual = list.toNodesArray();

            assert.deepStrictEqual(actual, expected);
        });
    });
});
