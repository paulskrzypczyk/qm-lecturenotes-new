---
title: Glossary
---

The terms below are linked from their first use in each chapter: hover over a linked term on any page to see its definition without leaving the text. The chapter in brackets is where each idea is introduced.

```{glossary}
wavefunction
: The function $\psi(x)$ that specifies the state of a quantum particle in terms of position, through $\ket{\psi} = \infint \psi(x)\ket{x}dx$. It is complex in general, and only its modulus squared is directly observable. (Chapter 1)

position state
: The state $\ket{x}$ of a particle located exactly at $x$. Position states are not normalisable ($\inner{x}{x'} = \delta(x-x')$), so no particle can actually be in one, but they form the basis in which wavefunctions are written. (Chapter 1)

probability density
: $\pd(x) = |\psi(x)|^2$: the probability to find the particle in a small region of width $dx$ around $x$ is $\pd(x)\,dx$, and the probability to find it between $x_a$ and $x_b$ is $\int_{x_a}^{x_b}\pd(x)dx$. (Chapter 1)

normalisation
: The requirement $\inner{\psi}{\psi} = \infint |\psi(x)|^2 dx = 1$, so that the total probability to find the particle somewhere is one. A wavefunction that is not normalised is fixed by dividing by the square root of this integral. (Chapter 1)

superposition
: A state that is a sum of other states with complex coefficients, such as $\ket{\psi} = \infint \psi(x)\ket{x}dx$ or $\ket{\psi} = \sum_n c_n \ket{E_n}$. Measurement outcomes are then probabilistic, with probabilities given by the squared moduli of the coefficients. (Chapter 1)

eigenstate
: A state $\ket{a}$ that an operator $\hat{A}$ leaves unchanged apart from a number: $\hat{A}\ket{a} = a\ket{a}$. A particle in an eigenstate of $\hat{A}$ has the definite value $a$ for that observable. (Chapter 1)

eigenvalue
: The number $a$ in $\hat{A}\ket{a} = a\ket{a}$: one of the possible results of measuring the observable $\hat{A}$. (Chapter 1)

eigenfunction
: The wavefunction of an eigenstate, for example $u_n(x) = \inner{x}{E_n}$ for an energy eigenstate. (Chapter 4)

operator
: A linear map that acts on states (or, in the form $\op{A}$, on wavefunctions). Each observable has an operator whose eigenvalues are the possible measurement results and whose eigenstates are the states of definite value. (Chapter 1)

Dirac delta function
: The 'function' $\delta(x)$ that vanishes everywhere except at $x=0$ and integrates to one, so that $\infint f(x)\delta(x - x_0)dx = f(x_0)$. It expresses the normalisation of position and momentum states. (Chapter 1)

momentum wavefunction
: The function $\tilde\psi(p)$ that specifies the same state in terms of momentum, $\ket{\psi} = \infint \tilde\psi(p)\ket{p}dp$. It is the Fourier transform of $\psi(x)$, and $|\tilde\psi(p)|^2$ is the probability density for momentum. (Chapter 2)

plane wave
: The wavefunction $A e^{ipx/\hbar}$ of a particle with definite momentum $p$: a complex wave with wavelength $\lambda = h/p$ and the same modulus everywhere. (Chapter 2)

Fourier transform
: The pair of integrals that take $\psi(x)$ to $\tilde\psi(p)$ and back, $\tilde\psi(p) = \frac{1}{\sqrt{2\pi\hbar}}\infint \psi(x) e^{-ipx/\hbar}dx$ and its inverse. (Chapter 2)

standard deviation
: The spread $\Delta x = \sqrt{\av{x^2} - \av{x}^2}$ of the results of repeated position measurements on identically prepared particles (and likewise $\Delta p$ for momentum): the uncertainty in the quantity. (Chapter 3)

commutator
: $[\hat{A}, \hat{B}] = \hat{A}\hat{B} - \hat{B}\hat{A}$, which measures whether two operators can be applied in either order. For position and momentum, $[\hat{X}, \hat{P}] = i\hbar$. (Chapter 3)

incompatible observables
: Two observables whose operators do not commute. They have no common eigenstates, so a particle cannot have definite values of both at once; position and momentum are the prime example. (Chapter 3)

Heisenberg uncertainty principle
: $\Delta x\,\Delta p \geq \hbar/2$: the spreads in position and momentum of any state cannot both be small. The Gaussian wavefunction saturates the bound. (Chapter 3)

Hamiltonian
: The operator $\hat{H} = \hat{P}^2/2M + V(\hat{X})$ for the total energy. Its eigenvalues are the allowed energies and it generates time evolution through the Schrödinger equation. (Chapter 4)

energy eigenstate
: A state $\ket{E}$ with $\hat{H}\ket{E} = E\ket{E}$, of definite energy $E$. Its wavefunction $u_E(x)$ satisfies the time-independent Schrödinger equation. (Chapter 4)

time-independent Schrödinger equation
: $-\frac{\hbar^2}{2M}\frac{d^2u}{dx^2} + V(x)u(x) = E\,u(x)$ (the TISE): the equation whose normalisable solutions are the energy eigenfunctions and allowed energies of a particle in the potential $V(x)$. (Chapter 4)

Schrödinger equation
: $i\hbar \frac{d}{dt}\ket{\psi(t)} = \hat{H}\ket{\psi(t)}$: the equation of motion of quantum mechanics, which determines the state at any later time from the state now. (Chapter 5)

stationary state
: An energy eigenstate, so called because under time evolution it only acquires the phase $e^{-iEt/\hbar}$: its probability density, and every measurable property, stays constant. (Chapter 5)

wavepacket
: A localised wavefunction, such as the Gaussian $\psi(x) \propto e^{-x^2/4a^2}e^{ip_0x/\hbar}$, built from a range of momenta. A free wavepacket moves at the classical speed $p_0/M$ and spreads as it goes. (Chapter 6)

infinite square well
: The potential that is zero for $0 \leq x \leq L$ and infinite outside: the simplest model of a particle confined to a region, with energies $E_n = n^2\pi^2\hbar^2/2ML^2$. (Chapter 7)

quantum number
: The integer $n = 1, 2, 3, \dots$ (or $n = 0, 1, 2, \dots$ for the oscillator) that labels the energy levels and eigenfunctions of a bound particle; in three dimensions there is one per dimension. (Chapter 7)

bound state
: An energy eigenstate whose wavefunction is normalisable and localised, as for the infinite square well and the harmonic oscillator; bound states have discrete energies. (Chapter 7)

ground state
: The energy eigenstate of lowest energy. Its energy is above the minimum of the potential — the zero-point energy — as a consequence of the uncertainty principle. (Chapter 7)

creation and annihilation operators
: The pair $\hat{a}^\dagger$ and $\hat{a}$ for the harmonic oscillator, which raise and lower the energy by one quantum $\hbar\omega$: $\hat{a}^\dagger\ket{E_n} \propto \ket{E_{n+1}}$ and $\hat{a}\ket{E_n} \propto \ket{E_{n-1}}$. All the eigenstates are generated from the ground state by $\hat{a}^\dagger$. (Chapter 8)

tunnelling
: The non-zero probability of finding a quantum particle in a region where its energy is below the potential energy, which is forbidden classically. (Chapter 8)

reflection and transmission coefficients
: $R$ and $T$, the probabilities that a particle incident on a potential step (or barrier) is reflected or transmitted; $R + T = 1$. (Chapter 9)

degeneracy
: Several distinct energy eigenstates sharing the same energy. In three dimensions it arises from the symmetry of the potential, for example the permutations of $(n_x, n_y, n_z)$ in a cubic box. (Chapter 11)
```
