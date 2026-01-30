<template>
    <h1>dashboard</h1>
    <div class="container p-0 mt-4">
        <!-- Main Content -->
        <main class="main-content">
            <!-- App Promotion Banner -->
            <!-- Stats Cards -->
            <div class="row ">
                <div v-for="(card, index) in Cards" :key="index" class="col-12 col-md-6 col-lg-3 mb-4">
                    <div class="stat-card text-center" :class="['cyan', 'blue', 'pink', 'purple'][index]">
                        <div :class="`stat-icon mx-auto text-white ${card.icon}`"></div>
                        <div class="stat-label">{{ card.title }}</div>
                        <div class="stat-value">{{ card.value }}</div>
                    </div>
                </div>
            </div>
            <!-- Dashboard Grid -->
            <div class="dashboard-grid">
                <!-- Activity Trends Chart -->
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Lost vs Found Trends</div>
                    </div>
                    <div class="bar-chart-container">
                        <div class="bar-chart">
                            <div class="bar-group">
                                <div class="bar-wrapper">
                                    <div class="bar bar-lost" style="height: 70%" data-value="14">
                                        <span class="bar-value">14</span>
                                    </div>
                                    <div class="bar bar-found" style="height: 85%" data-value="17">
                                        <span class="bar-value">17</span>
                                    </div>
                                </div>
                                <div class="bar-label">Mon</div>
                            </div>
                            <div class="bar-group">
                                <div class="bar-wrapper">
                                    <div class="bar bar-lost" style="height: 60%" data-value="12">
                                        <span class="bar-value">12</span>
                                    </div>
                                    <div class="bar bar-found" style="height: 75%" data-value="15">
                                        <span class="bar-value">15</span>
                                    </div>
                                </div>
                                <div class="bar-label">Tue</div>
                            </div>
                            <div class="bar-group">
                                <div class="bar-wrapper">
                                    <div class="bar bar-lost" style="height: 90%" data-value="18">
                                        <span class="bar-value">18</span>
                                    </div>
                                    <div class="bar bar-found" style="height: 95%" data-value="19">
                                        <span class="bar-value">19</span>
                                    </div>
                                </div>
                                <div class="bar-label">Wed</div>
                            </div>
                            <div class="bar-group">
                                <div class="bar-wrapper">
                                    <div class="bar bar-lost" style="height: 80%" data-value="16">
                                        <span class="bar-value">16</span>
                                    </div>
                                    <div class="bar bar-found" style="height: 70%" data-value="14">
                                        <span class="bar-value">14</span>
                                    </div>
                                </div>
                                <div class="bar-label">Thu</div>
                            </div>
                            <div class="bar-group">
                                <div class="bar-wrapper">
                                    <div class="bar bar-lost" style="height: 65%" data-value="13">
                                        <span class="bar-value">13</span>
                                    </div>
                                    <div class="bar bar-found" style="height: 80%" data-value="16">
                                        <span class="bar-value">16</span>
                                    </div>
                                </div>
                                <div class="bar-label">Fri</div>
                            </div>
                            <div class="bar-group">
                                <div class="bar-wrapper">
                                    <div class="bar bar-lost" style="height: 40%" data-value="8">
                                        <span class="bar-value">8</span>
                                    </div>
                                    <div class="bar bar-found" style="height: 50%" data-value="10">
                                        <span class="bar-value">10</span>
                                    </div>
                                </div>
                                <div class="bar-label">Sat</div>
                            </div>
                            <div class="bar-group">
                                <div class="bar-wrapper">
                                    <div class="bar bar-lost" style="height: 35%" data-value="7">
                                        <span class="bar-value">7</span>
                                    </div>
                                    <div class="bar bar-found" style="height: 45%" data-value="9">
                                        <span class="bar-value">9</span>
                                    </div>
                                </div>
                                <div class="bar-label">Sun</div>
                            </div>
                        </div>
                        <div class="chart-legend">
                            <div class="legend-item-chart">
                                <div class="legend-dot-chart"
                                    style="background: linear-gradient(135deg, #f5a4c7, #ffb5d0)"></div>
                                <span>Items Lost</span>
                            </div>
                            <div class="legend-item-chart">
                                <div class="legend-dot-chart"
                                    style="background: linear-gradient(135deg, #6dd5ed, #7ba7e8)"></div>
                                <span>Items Found</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Category Breakdown -->
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Items by Category</div>
                    </div>

                    <div class="activity-chart">
                        <div class="donut-chart">
                            <div class="donut-center">
                                <div class="donut-value">99</div>
                                <div class="donut-label">Total Items</div>
                            </div>
                        </div>
                    </div>

                    <div class="activity-legend">
                        <div class="legend-item">
                            <div class="legend-label">
                                <div class="legend-dot" style="background: #f5a4c7"></div>
                                Electronics
                            </div>
                            <div class="legend-value">28%</div>
                        </div>
                        <div class="legend-item">
                            <div class="legend-label">
                                <div class="legend-dot" style="background: #ff9f66"></div>
                                Others
                            </div>
                            <div class="legend-value">12%</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Grid -->
            <div class="dashboard-grid">
                <!-- Recent Activity -->
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Recent Activity</div>
                    </div>

                    <div class="transaction-tabs">
                        <div class="tab active">All Items</div>
                        <div class="tab">Lost</div>
                        <div class="tab">Found</div>
                    </div>

                    <div class="transactions-list">
                        <div class="transaction-item">
                            <div class="transaction-left">
                                <div class="transaction-icon">📱</div>
                                <div class="transaction-details">
                                    <h4>iPhone 13 Pro</h4>
                                    <div class="transaction-meta">
                                        <span>Electronics</span>
                                        <span>Found • 2 hours ago</span>
                                    </div>
                                </div>
                            </div>
                            <div class="transaction-amount" style="color: #4ecdc4">
                                ✓ Found
                            </div>
                        </div>

                        <div class="transaction-item">
                            <div class="transaction-left">
                                <div class="transaction-icon">💳</div>
                                <div class="transaction-details">
                                    <h4>Black Leather Wallet</h4>
                                    <div class="transaction-meta">
                                        <span>Personal</span>
                                        <span>Lost • 5 hours ago</span>
                                    </div>
                                </div>
                            </div>
                            <div class="transaction-amount" style="color: #e88bb0">
                                ⚠ Lost
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Popular Locations -->
                <div class="card goals-section">
                    <div class="goals-header">
                        <div class="card-title">Popular Locations</div>
                        <button class="add-goal-btn">View All</button>
                    </div>
                    <div class="goal-item">
                        <div class="goal-header">
                            <div class="goal-icon">📚</div>
                            <div class="goal-info">
                                <div class="goal-title">Central Library</div>
                                <div class="goal-amount">28 items reported</div>
                            </div>
                            <div class="goal-percentage">28%</div>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="
                  width: 28%;
                  background: linear-gradient(90deg, #6dd5ed, #7ba7e8);
                "></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useReportStore } from "@/stores/reportStore";
const reportStore = useReportStore();

await reportStore.getAllReports();

const totalItems = computed(() => reportStore.meta?.totalItems || 0);

console.log("Total Items:", reportStore.meta.totalItems);


const Cards = ref([
    {
        title: "Total Items",
        value: totalItems,
        icon: "bi-collection",
    },
    {
        title: "Items Lost",
        value: 57,
        icon: "bi-geo-alt",
    },
    {
        title: "Items Found",
        value: 42,
        icon: "bi-shield-check",
    },
    {
        title: "Total Users",
        value: 1200,
        icon: "bi-people",
    },
]);
// Animate progress bars on load
window.addEventListener("load", () => {
    document.querySelectorAll(".progress-fill").forEach((bar) => {
        const width = bar.style.width;
        bar.style.width = "0";
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
});
// Tab switching
document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", function () {
        document
            .querySelectorAll(".tab")
            .forEach((t) => t.classList.remove("active"));
        this.classList.add("active");
    });
});
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: linear-gradient(135deg, #eef2f8 0%, #e8edfa 50%, #f2e8fa 100%);
    color: var(--text-primary);
    min-height: 100vh;
    overflow-x: hidden;
}

/* Main Content */
.main-content {
    flex: 1;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.stat-card {
    padding: 1.75rem;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    transition: all 0.4s ease;
    animation: fadeInUp 0.6s ease-out backwards;
}

.stat-card:nth-child(1) {
    animation-delay: 0.1s;
}

.stat-card:nth-child(2) {
    animation-delay: 0.2s;
}

.stat-card:nth-child(3) {
    animation-delay: 0.3s;
}

.stat-card:nth-child(4) {
    animation-delay: 0.4s;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.stat-card.cyan {
    background: linear-gradient(135deg, #84cbfe, #BBDEFB);
}

.stat-card.blue {
    background: linear-gradient(135deg, #ef85ff, #E1BEE7);

}

.stat-card.pink {
    background: linear-gradient(135deg, #3be84a, #C8E6C9);
}

.stat-card.purple {
    background: linear-gradient(135deg, #febb4e, #FFE0B2);
}

.stat-icon {
    width: 48px;
    height: 48px;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.stat-label {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.stat-value {
    color: white;
    font-size: 2rem;
    font-weight: 700;
    font-family: "Sora", sans-serif;
    margin-bottom: 0.75rem;
}

/* Main Grid */
.dashboard-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
}

.card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 1.75rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
    animation: fadeInUp 0.6s ease-out backwards;
    animation-delay: 0.5s;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.card-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
}

/* Chart */
.chart-container {
    height: 300px;
    position: relative;
}

.chart {
    width: 100%;
    height: 100%;
}

.chart-point {
    position: absolute;
    top: 20%;
    left: 55%;
    background: white;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-weight: 600;
    color: var(--text-primary);
    font-family: "Sora", sans-serif;
}

/* Bar Chart */
.bar-chart-container {
    padding: 1rem 0;
}

.bar-chart {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 280px;
    gap: 1rem;
    padding: 0 1rem;
    position: relative;
}

.bar-chart::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
}

.bar-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
}

.bar-wrapper {
    width: 100%;
    height: 240px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 0.25rem;
    position: relative;
}

.bar {
    flex: 1;
    max-width: 28px;
    border-radius: 8px 8px 0 0;
    position: relative;
    transition: all 0.4s ease;
    cursor: pointer;
    animation: barGrow 0.8s ease-out backwards;
}

.bar-group:nth-child(1) .bar {
    animation-delay: 0.1s;
}

.bar-group:nth-child(2) .bar {
    animation-delay: 0.2s;
}

.bar-group:nth-child(3) .bar {
    animation-delay: 0.3s;
}

.bar-group:nth-child(4) .bar {
    animation-delay: 0.4s;
}

.bar-group:nth-child(5) .bar {
    animation-delay: 0.5s;
}

.bar-group:nth-child(6) .bar {
    animation-delay: 0.6s;
}

.bar-group:nth-child(7) .bar {
    animation-delay: 0.7s;
}

@keyframes barGrow {
    from {
        height: 0 !important;
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.bar-lost {
    background: linear-gradient(180deg, #f5a4c7 0%, #ffb5d0 100%);
    box-shadow: 0 2px 8px rgba(245, 164, 199, 0.3);
}

.bar-found {
    background: linear-gradient(180deg, #6dd5ed 0%, #7ba7e8 100%);
    box-shadow: 0 2px 8px rgba(109, 213, 237, 0.3);
}

.bar:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.bar-value {
    position: absolute;
    top: -24px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--text-primary);
    opacity: 0;
    transition: opacity 0.3s ease;
    font-family: "Sora", sans-serif;
}

.bar:hover .bar-value {
    opacity: 1;
}

.bar-label {
    font-size: 0.85rem;
    color: var(--text-secondary);
    font-weight: 500;
    text-align: center;
}

.chart-legend {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.legend-item-chart {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
}

.legend-dot-chart {
    width: 16px;
    height: 16px;
    border-radius: 4px;
}

/* Activity Donut */
.activity-chart {
    position: relative;
    width: 100%;
    max-width: 240px;
    margin: 2rem auto;
}

.donut-chart {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: conic-gradient(from 0deg,
            #f5a4c7 0deg 115deg,
            #6dd5ed 115deg 205deg,
            #ffd166 205deg 266deg,
            #b9a4f5 266deg 324deg,
            #ff9f66 324deg 360deg);
    position: relative;
}

.donut-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 140px;
    height: 140px;
    background: white;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.donut-value {
    font-size: 1.75rem;
    font-weight: 700;
    font-family: "Sora", sans-serif;
    color: var(--text-primary);
}

.donut-label {
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.activity-legend {
    margin-top: 1.5rem;
}

.legend-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.legend-item:last-child {
    border-bottom: none;
}

.legend-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.legend-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.legend-value {
    font-weight: 600;
    color: var(--text-primary);
}

/* Transaction History */
.transaction-tabs {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.tab {
    padding: 0.75rem 0;
    color: var(--text-secondary);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
    font-weight: 500;
}

.tab.active {
    color: var(--blue-dark);
    border-bottom-color: var(--blue-dark);
}

.transactions-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.transaction-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 12px;
    transition: all 0.3s ease;
}

.transaction-item:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateX(4px);
}

.transaction-left {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.transaction-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    background: rgba(0, 0, 0, 0.03);
}

.transaction-details h4 {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
}

.transaction-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.8rem;
    color: var(--text-secondary);
}

.transaction-amount {
    font-weight: 600;
    font-family: "Sora", sans-serif;
    color: var(--text-primary);
}

/* Goals Section */
.goals-section {
    animation-delay: 0.6s;
}

.goals-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.add-goal-btn {
    padding: 0.5rem 1.25rem;
    background: linear-gradient(135deg, var(--blue), var(--blue-dark));
    color: white;
    border: none;
    border-radius: 10px;
    font-family: "Outfit", sans-serif;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.875rem;
}

.add-goal-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(123, 167, 232, 0.3);
}

.goal-item {
    margin-bottom: 1.5rem;
}

.goal-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
}

.goal-icon {
    font-size: 1.75rem;
}

.goal-info {
    flex: 1;
}

.goal-title {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
}

.goal-amount {
    font-size: 0.8rem;
    color: var(--text-secondary);
}

.goal-percentage {
    font-weight: 600;
    color: var(--text-primary);
    font-family: "Sora", sans-serif;
}

.progress-bar {
    height: 8px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    border-radius: 10px;
    transition: width 1s ease;
}

@media (max-width: 1200px) {
    .dashboard-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .main-content {
        padding: 1.5rem;
    }

    .app-banner {
        flex-direction: column;
        text-align: center;
        padding: 1.5rem;
    }

    .app-banner-illustration svg {
        width: 200px;
        height: auto;
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(20px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideOutRight {
    from {
        opacity: 1;
        transform: translateX(0);
    }

    to {
        opacity: 0;
        transform: translateX(20px);
    }
}
</style>
