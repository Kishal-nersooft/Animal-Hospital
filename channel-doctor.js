/**
 * Channel a Doctor — Best Care Animal Hospital
 */

const VETS = [
  {
    id: 1,
    name: 'OPD Team',
    clinic: 'Best Care Animal Hospital — OPD',
    city: 'Nugegoda',
    specialty: 'general',
    pets: ['dog', 'cat'],
    rating: 4.9,
    reviews: 200,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=200&q=80',
    available: '8am – 8pm',
  },
  {
    id: 2,
    name: 'Surgery Unit',
    clinic: 'Best Care Animal Hospital — Surgery',
    city: 'Nugegoda',
    specialty: 'surgery',
    pets: ['dog', 'cat'],
    rating: 4.8,
    reviews: 150,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&q=80',
    available: 'By appointment',
  },
  {
    id: 3,
    name: 'Emergency / OPD',
    clinic: 'Best Care Animal Hospital',
    city: 'Nugegoda',
    specialty: 'emergency',
    pets: ['dog', 'cat'],
    rating: 4.9,
    reviews: 180,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80',
    available: 'Walk-in & call',
  },
  {
    id: 4,
    name: 'Cat Treatment Area',
    clinic: 'Best Care — Dedicated Cat Zone',
    city: 'Nugegoda',
    specialty: 'general',
    pets: ['cat'],
    rating: 5.0,
    reviews: 85,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&q=80',
    available: 'This week',
  },
  {
    id: 5,
    name: 'Mobile Veterinary',
    clinic: 'Best Care Mobile Vet Service',
    city: 'Colombo area',
    specialty: 'general',
    pets: ['dog', 'cat'],
    rating: 4.8,
    reviews: 120,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&q=80',
    available: '8am – 5pm',
  },
  {
    id: 6,
    name: 'Inward Care & Boarding',
    clinic: 'Best Care Kennels — Piliyandala',
    city: 'Kesbawa',
    specialty: 'general',
    pets: ['dog', 'cat'],
    rating: 4.9,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&q=80',
    available: '24h care',
  },
];

const specialtyLabels = {
  general: 'General practice',
  surgery: 'Surgery',
  dermatology: 'Dermatology',
  emergency: 'Emergency & OPD',
};

document.addEventListener('DOMContentLoaded', () => {
  if (!document.body.classList.contains('page-channel-doctor')) return;

  initVetDirectory();
  initChannelForm();
});

function initVetDirectory() {
  const grid = document.getElementById('vetGrid');
  const cityInput = document.getElementById('vetCity');
  const specialtySelect = document.getElementById('vetSpecialty');
  const searchBtn = document.getElementById('vetSearchBtn');
  const noResults = document.getElementById('vetNoResults');
  const petToggle = document.querySelector('.vet-pet-toggle');
  const preferredVetInput = document.getElementById('preferredVet');

  if (!grid) return;

  let petFilter = 'all';

  function renderVets(vets) {
    grid.innerHTML = '';

    if (vets.length === 0) {
      noResults?.classList.remove('hidden');
      return;
    }

    noResults?.classList.add('hidden');

    vets.forEach((vet, index) => {
      const card = document.createElement('article');
      card.className = 'vet-card reveal';
      card.dataset.delay = String((index % 3) * 100);
      card.innerHTML = `
        <div class="vet-card-header">
          <img src="${vet.image}" alt="${vet.name}">
          <span class="vet-availability">${vet.available}</span>
        </div>
        <div class="vet-card-body">
          <h3>${vet.name}</h3>
          <p class="vet-clinic">${vet.clinic}</p>
          <p class="vet-meta"><i class="fa-solid fa-location-dot"></i> ${vet.city} · ${specialtyLabels[vet.specialty]}</p>
          <div class="vet-rating">
            <i class="fa-solid fa-star"></i> ${vet.rating} <span>(${vet.reviews} reviews)</span>
          </div>
          <div class="vet-pets">
            ${vet.pets.includes('dog') ? '<span><i class="fa-solid fa-dog"></i> Dogs</span>' : ''}
            ${vet.pets.includes('cat') ? '<span><i class="fa-solid fa-cat"></i> Cats</span>' : ''}
          </div>
          <button type="button" class="btn btn-primary btn-full vet-select-btn" data-vet="${vet.clinic} — ${vet.name}">
            Channel to this team
          </button>
        </div>
      `;
      grid.appendChild(card);
    });

    grid.querySelectorAll('.reveal').forEach((el) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const delay = entry.target.dataset.delay || 0;
              setTimeout(() => entry.target.classList.add('visible'), parseInt(delay, 10));
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
    });

    grid.querySelectorAll('.vet-select-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const vetName = btn.dataset.vet;
        if (preferredVetInput) preferredVetInput.value = vetName;
        document.getElementById('channel-form')?.scrollIntoView({ behavior: 'smooth' });
        preferredVetInput?.focus();
      });
    });
  }

  function filterVets() {
    const city = cityInput?.value.trim().toLowerCase() || '';
    const specialty = specialtySelect?.value || '';

    return VETS.filter((vet) => {
      const matchCity = !city || vet.city.toLowerCase().includes(city) || vet.clinic.toLowerCase().includes(city);
      const matchSpecialty = !specialty || vet.specialty === specialty;
      const matchPet = petFilter === 'all' || vet.pets.includes(petFilter);
      return matchCity && matchSpecialty && matchPet;
    });
  }

  function runSearch() {
    renderVets(filterVets());
  }

  petToggle?.querySelectorAll('.pet-type-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      petToggle.querySelectorAll('.pet-type-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      petFilter = btn.dataset.filter;
      runSearch();
    });
  });

  searchBtn?.addEventListener('click', runSearch);
  cityInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runSearch();
    }
  });

  renderVets(VETS);
}

function initChannelForm() {
  const form = document.getElementById('channelRequestForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('patientName')?.value;
    const vet = document.getElementById('preferredVet')?.value || 'Best Care Animal Hospital';
    alert(
      `Thank you, ${name}! Your channel request to ${vet} has been received. We will contact you within 24 hours. For urgent care, please call 011 7 400 800.`
    );
    form.reset();
  });
}
