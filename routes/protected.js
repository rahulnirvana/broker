import { Router } from 'express';
const router = Router();

router.get('/holdings', (req, res) => {
    res.json({ holdings: [{ symbol: 'AAPL', qty: 10, avgPrice: 150 }] });
});

router.get('/orderbook', (req, res) => {
    res.json({ orderbook: [{ symbol: 'AAPL', side: 'buy', price: 150, qty: 5 }], pnl: 120 });
});

router.get('/positions', (req, res) => {
    res.json({ positions: [{ symbol: 'AAPL', qty: 10, pnl: 120 }], pnlCard: { total: 120 } });
});

export default router;
