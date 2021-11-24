// index.js
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/curing-calculator/docroot/sw.js")
        .then(() => console.log("registered service worker!"))
        .catch(err => console.error(err))
} else {
    alert('nope');
}

function app() {
    return {
        calc_salt: '0 grams',
        calc_days: '0 days',
        init_calc: function() {
            this.update_calc();
            this.update_dims();
        },
        update_calc: function() {
            var ppm_value = document.querySelector('[name="ppm"]').value;
            var wt_factor = 1;
            var vol_factor = 1.0;
            var total_vol = vol_factor * document.querySelector('[name="brine_amt"]').value + wt_factor * document.querySelector('[name="meat_amt"]').value;
            var gms_no2 = total_vol * 1000 * ppm_value / 1000000 / 0.0625;
            this.calc_salt = (gms_no2).toFixed(1) + " grams";
        },
        update_dims: function() {
            var t_factor = 1 / 2.54;
            var tdim = t_factor * document.querySelector('[name="thick_ness"]').value;
            var curetime = 1.35 * tdim * tdim;
            if (document.getElementById("shape_flat").checked) {
                this.calc_days = (curetime).toFixed(1) + " days"
            } else if (document.getElementById("shape_cylinder").checked) {
                this.calc_days = (curetime / 1.75).toFixed(1) + " days"
            }
        }
    }
}
