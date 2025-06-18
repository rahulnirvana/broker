import { Holdings } from '../models/holdings.js';
import { OrderBook } from '../models/orderbook.js';
import { Positions } from '../models/positions.js';
import CircuitBreaker from '../utils/circuitBreaker.js';

const holdingsBreaker = new CircuitBreaker(Holdings.getByUserId.bind(Holdings), {
    failureThreshold: 3,
    successThreshold: 1,
    timeout: 10000,
});

const orderBookBreaker = new CircuitBreaker(OrderBook.getByUserId.bind(OrderBook), {
    failureThreshold: 3,
    successThreshold: 1,
    timeout: 10000,
});

const positionsBreaker = new CircuitBreaker(Positions.getByUserId.bind(Positions), {
    failureThreshold: 3,
    successThreshold: 1,
    timeout: 10000,
});

export const getHoldings = async (req, res) => {
    const userId = req.user.id;
    try {
        const holdings = await holdingsBreaker.call(userId);
        res.json({ holdings });
    } catch (err) {
        res.status(503).json({ error: 'Upstream service unavailable (circuit breaker)' });
    }
};

export const getOrderBook = async (req, res) => {
    const userId = req.user.id;
    try {
        const orderbook = await orderBookBreaker.call(userId);
        res.json({ orderbook });
    } catch (err) {
        res.status(503).json({ error: 'Upstream service unavailable (circuit breaker)' });
    }
};

export const getPositions = async (req, res) => {
    const userId = req.user.id;
    try {
        const positions = await positionsBreaker.call(userId);
        res.json({ positions });
    } catch (err) {
        res.status(503).json({ error: 'Upstream service unavailable (circuit breaker)' });
    }
};
