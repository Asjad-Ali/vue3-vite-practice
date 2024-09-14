<template>
  <div>
    <div class="row">
      <div
        class="col-lg-12 split-container mb-4 mt-lg-4 mt-0 flex-lg-nowrap flex-wrap"
      >
        <div class="repayment-pagination mb-3">
          <button
            :disabled="pageNo == 0"
            class="paginate-btn back-next"
            :class="{ disable: pageNo == 0 }"
            @click="showPage(Number(pageNo - 1))"
          >
            <span><i class="far fa-chevron-right"></i> &nbsp; الخلف </span>
          </button>
          <div v-for="(item, index) in noOfPages" :key="index">
            <button
              aria-current="page"
              class="paginate-btn"
              :class="{
                active: pageNo == item,
                disable: item === '...',
              }"
              :disabled="item === '...'"
              @click="showPage(item)"
            >
              <span>{{ item === "..." ? "..." : item + 1 }}</span>
            </button>
          </div>
          <button
            :disabled="
              pageNo == noOfPages[noOfPages.length - 1] ||
              !transactions?.transactions?.length
            "
            class="paginate-btn back-next"
            :class="{
              disable: pageNo == noOfPages[noOfPages.length - 1],
            }"
            @click="showPage(Number(pageNo + 1))"
          >
            <span> التالي &nbsp; <i class="far fa-chevron-left"></i></span>
          </button>
        </div>
        <div class="showing-records">
          <span>
            عرض
            <b v-if="transactions?.transactions?.length">{{
              numberFormat(pageSize * (pageNo + 1) - (pageSize - 1), 0)
            }}</b>
            <b v-else>0</b>
            إلى
            <b v-if="transactions?.transactions?.length">{{
              numberFormat(
                pageNo === noOfPages[noOfPages.length - 1]
                  ? transactions.transactions_count
                  : pageSize * (pageNo + 1),
                0
              )
            }}</b>
            <b v-else>0</b>
            من أصل
            <b>{{ numberFormat(transactions.transactions_count, 0) }}</b>
            مُدخل
          </span>
        </div>
      </div>
    </div>
  </div>
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
  totalPages.value = Math.ceil(
    statsData.value.repayment_plans_count / Number(pageSize.value)
  );
});
</script>
