import { BinaryHeap } from './heap.js';

onload = function () {
    let curr_data;
    const container = document.getElementById('mynetwork');
    const container2 = document.getElementById('mynetwork2');
    const generateGraph = document.getElementById('generate-graph');
    const solve = document.getElementById('solve');
    const temptext = document.getElementById('temptext');
    const numPeopleInput = document.getElementById('numPeople');
    const addCashFlow = document.getElementById('addCashFlow');
    const fromPersonInput = document.getElementById('fromPerson');
    const toPersonInput = document.getElementById('toPerson');
    const amountInput = document.getElementById('amount');

    let people = [];
    let cashFlows = [];

    // Initialise graph options
    const options = {
        edges: {
            arrows: {
                to: true
            },
            labelHighlightBold: true,
            font: {
                size: 20
            }
        },
        nodes: {
            font: '12px arial red',
            scaling: {
                label: true
            },
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf183',
                size: 50,
                color: '#991133',
            }
        }
    };

    let network = new vis.Network(container);
    network.setOptions(options);
    let network2 = new vis.Network(container2);
    network2.setOptions(options);

    addCashFlow.onclick = function () {
        const fromPerson = parseInt(fromPersonInput.value);
        const toPerson = parseInt(toPersonInput.value);
        const amount = parseInt(amountInput.value);

        if (fromPerson > 0 && toPerson > 0 && amount > 0) {
            cashFlows.push({ from: fromPerson, to: toPerson, label: String(amount) });
            alert(`Cash flow added: Person ${fromPerson} pays Person ${toPerson} $${amount}`);
        } else {
            alert('Please fill out all fields with valid numbers.');
        }
    };

    generateGraph.onclick = function () {
        const numPeople = parseInt(numPeopleInput.value);
        if (numPeople < 2) {
            alert('Number of people must be at least 2.');
            return;
        }

        // Generate nodes based on the number of people
        let nodes = [];
        for (let i = 1; i <= numPeople; i++) {
            nodes.push({ id: i, label: `Person ${i}` });
        }
        nodes = new vis.DataSet(nodes);

        // Use the cashFlows array to create edges
        const edges = cashFlows;

        const data = {
            nodes: nodes,
            edges: edges
        };

        curr_data = data;
        network.setData(data);
        temptext.style.display = "inline";
        container2.style.display = "none";
    };

    solve.onclick = function () {
        temptext.style.display = "none";
        container2.style.display = "inline";
        const solvedData = solveData();
        network2.setData(solvedData);
    };

    function solveData() {
        let data = curr_data;
        const sz = data['nodes'].length;
        const vals = Array(sz).fill(0);

        // Calculate net balance of each person
        for (let i = 0; i < data['edges'].length; i++) {
            const edge = data['edges'][i];
            vals[edge['to'] - 1] += parseInt(edge['label']);
            vals[edge['from'] - 1] -= parseInt(edge['label']);
        }

        const pos_heap = new BinaryHeap();
        const neg_heap = new BinaryHeap();

        for (let i = 0; i < sz; i++) {
            if (vals[i] > 0) {
                pos_heap.insert([vals[i], i]);
            } else {
                neg_heap.insert(([-vals[i], i]));
                vals[i] *= -1;
            }
        }

        const new_edges = [];
        while (!pos_heap.empty() && !neg_heap.empty()) {
            const mx = pos_heap.extractMax();
            const mn = neg_heap.extractMax();

            const amt = Math.min(mx[0], mn[0]);
            const to = mx[1];
            const from = mn[1];

            new_edges.push({ from: from + 1, to: to + 1, label: String(Math.abs(amt)) });
            vals[to] -= amt;
            vals[from] -= amt;

            if (mx[0] > mn[0]) {
                pos_heap.insert([vals[to], to]);
            } else if (mx[0] < mn[0]) {
                neg_heap.insert([vals[from], from]);
            }
        }

        data = {
            nodes: data['nodes'],
            edges: new_edges
        };
        return data;
    }
};
