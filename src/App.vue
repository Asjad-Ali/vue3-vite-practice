<template>
  <router-view></router-view>
</template>

<script setup>
const pageSize = ref("24");
const pageNo = ref("0");
const totalPages = ref(0);
const maxButtons = ref(8);

watch([pageSize, pageNo], async ([newPageSize], [prevPageSize]) => {
  await getRepayments(pageNo.value, pageSize.value);
  totalPages.value = Number(
    Math.ceil(statsData.value.repayment_plans_count / Number(pageSize.value))
  );
  if (newPageSize !== prevPageSize) pageNo.value = 0;
});

const noOfPages = computed(() => {
  const totalButtons = [];
  if (totalPages.value <= maxButtons.value) {
    for (let i = 0; i < totalPages.value; i++) {
      totalButtons.push(i);
    }
  } else {
    const start = Math.max(0, pageNo.value - Math.floor(maxButtons.value / 2));
    const end = Math.min(start + maxButtons.value - 1, totalPages.value - 1);

    if (start > 0) {
      totalButtons.push(0);
      if (start > 1) {
        totalButtons.push("...");
      }
    }

    totalButtons.push(
      ...Array.from({ length: end - start + 1 }, (_, i) => start + i)
    );

    if (end < totalPages.value - 1) {
      if (end < totalPages.value - 2) {
        totalButtons.push("...");
      }
      totalButtons.push(totalPages.value - 1);
    } else if (start === 0) {
      totalButtons.unshift(totalPages.value - 1);
    }
  }

  return totalButtons;
});

function showPage(ind) {
  pageNo.value = ind;
  return navigateTo("#scroll-to-repayments");
}

onMounted(async () => {
  if (window.screen.width <= 640) maxButtons.value = 4;
  await getRepayments(pageNo.value, pageSize.value);
  await getOpportunities();
  totalPages.value = Math.ceil(
    statsData.value.repayment_plans_count / Number(pageSize.value)
  );
  instance.refs.repaymentCounter?.startCounter();
});
</script>
