import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { fetchAllOrdersAsync, selectOrders } from '../../Order/OrderSlice'
import { Link } from 'react-router-dom'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const reportsData = {
    labels: ['10am', '11am', '12pm', '01pm', '02pm', '03pm', '04pm', '05pm', '06pm', '07pm'],
    datasets: [
        {
            // Mocked data to visually match the provided graph's shape
            data: [55000, 30000, 65000, 50000, 88000, 45000, 58000, 35000, 65000, 85000],
            borderColor: 'rgba(99, 132, 255, 1)', // Start blue
            backgroundColor: (context) => {
                // Gradient fill mimicking the purple/pink transition in the image
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) {
                    return null;
                }

                let gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
                gradient.addColorStop(0, 'rgba(99, 132, 255, 1)'); // Blue
                gradient.addColorStop(0.5, 'rgba(150, 99, 255, 1)'); // Purple
                gradient.addColorStop(1, 'rgba(255, 99, 180, 1)'); // Pink
                return gradient;
            },
            tension: 0.4, // Smooth curve
            fill: false,
            pointRadius: 0, // No visible dots on the line
            borderWidth: 3,
            pointHitRadius: 10,
        },
    ],
};

// Options for the Reports (Line Chart)
const reportsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        tooltip: {
            mode: 'index',
            intersect: false,
        }
    },
    scales: {
        y: {
            min: 0,
            max: 100000,
            ticks: {
                callback: function (value) {
                    if (value === 0) return '0';
                    if (value === 20000) return '20K';
                    if (value === 40000) return '40K';
                    if (value === 60000) return '60K';
                    if (value === 80000) return '80K';
                    if (value === 100000) return '100K';
                    return null; // Don't display other ticks
                },
                color: '#A0A0A0',
                font: { size: 12 }
            },
            grid: {
                drawBorder: false,
                color: '#EFEFEF',
            },
        },
        x: {
            grid: {
                display: false,
                drawBorder: false,
            },
            ticks: {
                color: '#A0A0A0',
                font: { size: 12 }
            }
        },
    },
};


// Data for the Analytics (Doughnut Chart)
const analyticsData = {
    labels: ['Sale', 'Distribute', 'Return'],
    datasets: [
        {
            data: [40, 20, 20], // Values to sum up to 80% visually (40+20+20=80)
            backgroundColor: ['#4285F4', '#FFC107', '#FF6347'], // Blue, Yellow, Orange/Red
            hoverBackgroundColor: ['#4285F4', '#FFC107', '#FF6347'],
            borderWidth: 0,
        },
    ],
};

// Options for the Analytics (Doughnut Chart)
const analyticsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '80%', // Makes it a doughnut chart
    plugins: {
        legend: {
            display: false, // We'll render the legend separately
        },
        tooltip: {
            enabled: true,
            callbacks: {
                label: function (context) {
                    let label = context.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed !== null) {
                        label += context.parsed + '%';
                    }
                    return label;
                }
            }
        }
    }
};

const Dashboard = () => {

    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);

    useEffect(() => {
        dispatch(fetchAllOrdersAsync({}))
    }, [dispatch]);

    // Calculate Stats
    const totalRevenue = orders.reduce((acc, order) => acc + order.subtotal, 0);
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const dispatchedOrders = orders.filter(o => o.status === 'dispatched').length;

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        ArcElement
    );

    const textCenter = {
        id: 'textCenter',
        beforeDraw(chart) {
            const { ctx, chartArea: { width, height } } = chart;
            ctx.save();
            ctx.font = '700 32px sans-serif';
            ctx.fillStyle = '#333';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('80%', width / 2, height / 2 - 10);

            ctx.font = '14px sans-serif';
            ctx.fillStyle = '#A0A0A0';
            ctx.fillText('Transactions', width / 2, height / 2 + 20);
            ctx.restore();
        }
    };

    // A simple component to render the custom legend
    const CustomLegend = ({ labels, colors }) => (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
            {labels.map((label, index) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                    <span
                        style={{
                            backgroundColor: colors[index],
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            marginRight: '5px'
                        }}
                    />
                    <span style={{ fontSize: '14px', color: '#555' }}>{label}</span>
                </div>
            ))}
        </div>
    );

    return (
        <div className="fade-in-up">
            <h2 className="fw-bold mb-4 text-dark text-uppercase">Dashboard <span className='text-primary'>Overview</span> </h2>

            <div style={styles.dashboardContainer}>

                {/* 1. Reports Section (Line Chart) */}
                <div style={styles.card}>
                    <div style={styles.header}>
                        <h2 style={styles.title} className='fw-medium'>Reports</h2>
                        <span style={styles.menuIcon}>&#x22EF;</span>
                    </div>
                    <div style={styles.chartWrapper}>
                        <Line data={reportsData} options={reportsOptions} />
                    </div>
                </div>

                {/* 2. Analytics Section (Doughnut Chart) */}
                <div style={styles.card}>
                    <div style={styles.header}>
                        <h2 style={styles.title} className='fw-medium'>Analytics</h2>
                        <span style={styles.menuIcon}>&#x22EF;</span>
                    </div>
                    <div style={styles.chartWrapper}>
                        <div style={styles.doughnutContainer}>
                            <Doughnut
                                data={analyticsData}
                                options={analyticsOptions}
                                plugins={[textCenter]} // Apply the custom text plugin
                            />
                        </div>

                        <CustomLegend
                            labels={analyticsData.labels}
                            colors={analyticsData.datasets[0].backgroundColor}
                        />
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-5">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm rounded-4 h-100 bg-primary text-white">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="card-title mb-0 opacity-75">Total Revenue</h6>
                                <i className="fa-solid fa-wallet fs-4"></i>
                            </div>
                            <h3 className="display-6 fw-bold mb-0">₹{totalRevenue.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <Link to={'/adminorders'} className="card border-0 text-decoration-none shadow-sm rounded-4 h-100 bg-white">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="card-title mb-0 text-secondary">Total Orders</h6>
                                <div className="bg-light rounded p-2 text-primary"><i className="fa-solid fa-bag-shopping"></i></div>
                            </div>
                            <h3 className="fw-bold mb-0 text-dark">{totalOrders}</h3>
                        </div>
                    </Link>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="card-title mb-0 text-secondary">Pending</h6>
                                <div className="bg-warning bg-opacity-10 rounded p-2 text-warning"><i className="fa-solid fa-clock"></i></div>
                            </div>
                            <h3 className="fw-bold mb-0 text-dark">{pendingOrders}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="card-title mb-0 text-secondary">Dispatched</h6>
                                <div className="bg-success bg-opacity-10 rounded p-2 text-success"><i className="fa-solid fa-truck"></i></div>
                            </div>
                            <h3 className="fw-bold mb-0 text-dark">{dispatchedOrders}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="card border-0 shadow-sm rounded-4">
                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold">Recent Orders</h5>
                    <Link to="/adminorders" className="btn btn-sm btn-outline-primary">View All</Link>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="ps-4 py-3">Order ID</th>
                                    <th className="py-3">Customer</th>
                                    <th className="py-3">Amount</th>
                                    <th className="py-3">Status</th>
                                    <th className="py-3">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.slice(0, 5).map(order => (
                                    <tr key={order.id}>
                                        <td className="ps-4 fw-bold">#{order.id.slice(-6)}</td>
                                        <td>{order.selectedAddress.fullname}</td>
                                        <td>₹{order.subtotal}</td>
                                        <td>
                                            <span className={`badge rounded-pill px-3 py-2 ${order.status === 'pending' ? 'bg-warning text-dark' :
                                                order.status === 'dispatched' ? 'bg-info text-dark' :
                                                    order.status === 'delivered' ? 'bg-success' : 'bg-secondary'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="text-secondary small">
                                            {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

const styles = {
    dashboardContainer: {
        display: 'flex',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#F7F7F7', // Light background for the dashboard area
    },
    card: {
        flex: 1,
        minWidth: '450px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
    },
    title: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#333',
        margin: 0,
    },
    menuIcon: {
        fontSize: '24px',
        color: '#A0A0A0',
        cursor: 'pointer',
    },
    chartWrapper: {
        flex: 1,
        height: '300px', // Set a fixed height for charts to render properly
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    doughnutContainer: {
        height: '220px',
        width: '220px',
        margin: '0 auto',
        position: 'relative'
    }
};

export default Dashboard