<script setup lang="ts">
import '@/styles/components/SizeGuide.css'
const rows = [
  { size: '4', chest: '56–60', waist: '50–54', hip: '60–64', height: '100–110' },
  { size: '6', chest: '60–64', waist: '52–56', hip: '64–68', height: '110–120' },
  { size: '8', chest: '64–68', waist: '54–58', hip: '68–72', height: '120–130' },
  { size: '10', chest: '68–72', waist: '56–60', hip: '72–76', height: '130–140' },
  { size: '12', chest: '72–76', waist: '58–62', hip: '76–84', height: '140–150' },
  { size: '14', chest: '76–82', waist: '60–66', hip: '84–90', height: '150–160' },
  { size: '16', chest: '82–88', waist: '66–72', hip: '90–96', height: '160–165' },
  { size: 'S', chest: '82–88', waist: '64–70', hip: '90–96', height: '155–165' },
  { size: 'M', chest: '88–94', waist: '70–76', hip: '96–102', height: '160–170' },
  { size: 'L', chest: '94–100', waist: '76–82', hip: '102–108', height: '165–175' },
]
</script>

<template>
  <div class="size-card">
    <h2 class="size-title">Guía de tallas (orientativa)</h2>
    <p class="size-desc">Medidas en centímetros.</p>
    <div class="size-table">
      <table class="size-table-el">
        <thead>
          <tr class="size-head">
            <th class="size-cell">Talla</th>
            <th class="size-cell">Pecho</th>
            <th class="size-cell">Cintura</th>
            <th class="size-cell">Cadera</th>
            <th class="size-cell">Altura</th>
          </tr>
        </thead>
        <tbody class="text-gray-800">
          <tr v-for="r in rows" :key="r.size" class="size-row">
            <td class="size-cell font-medium">{{ r.size }}</td>
            <td class="size-cell">{{ r.chest }}</td>
            <td class="size-cell">{{ r.waist }}</td>
            <td class="size-cell">{{ r.hip }}</td>
            <td class="size-cell">{{ r.height }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="size-note">
      Consejo: Para patinaje artístico, la prenda debe ajustar pero permitir libertad de movimiento.
    </p>
  </div>
</template>
