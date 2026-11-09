---
title: Glossary
---

Each of the terms below is linked from its first use in every chapter, so that hovering over a linked term on any page shows its definition without leaving the text. The chapter in brackets is the one in which the idea is introduced.

```{glossary}
wavefunction
: The function $\psi(x)$ that specifies the state of a quantum particle in terms of its position, through $\ket{\psi} = \infint \psi(x)\ket{x}dx$. In general it is complex, and it is only its modulus squared that is directly observable. (Chapter 1)

position state
: The state $\ket{x}$ of a particle that is located exactly at $x$. Position states are not normalisable, since $\inner{x}{x'} = \delta(x-x')$, and so no particle can actually be in one. Nevertheless they form the basis in which wavefunctions are written. (Chapter 1)

probability density
: The function $\pd(x) = |\psi(x)|^2$. The probability of finding the particle in a small region of width $dx$ around $x$ is $\pd(x)\,dx$, and the probability of finding it between $x_a$ and $x_b$ is $\int_{x_a}^{x_b}\pd(x)dx$. (Chapter 1)

normalisation
: The requirement that $\inner{\psi}{\psi} = \infint |\psi(x)|^2 dx = 1$, so that the total probability of finding the particle somewhere is one. A wavefunction that is not normalised can be fixed by dividing it by the square root of this integral. (Chapter 1)

superposition
: A state that is a sum of other states with complex coefficients, such as $\ket{\psi} = \infint \psi(x)\ket{x}dx$ or $\ket{\psi} = \sum_n c_n \ket{E_n}$. The outcomes of a measurement on such a state are probabilistic, with probabilities given by the squared moduli of the coefficients. (Chapter 1)

eigenstate
: A state $\ket{a}$ that an operator $\hat{A}$ leaves unchanged apart from a number, so that $\hat{A}\ket{a} = a\ket{a}$. A particle in an eigenstate of $\hat{A}$ has the definite value $a$ for the corresponding observable. (Chapter 1)

eigenvalue
: The number $a$ in $\hat{A}\ket{a} = a\ket{a}$. The eigenvalues of $\hat{A}$ are the possible results of a measurement of the observable $\hat{A}$. (Chapter 1)

eigenfunction
: The wavefunction of an eigenstate. For example, $u_n(x) = \inner{x}{E_n}$ is the eigenfunction of the energy eigenstate $\ket{E_n}$. (Chapter 4)

operator
: A linear map that acts on states, or, in the form $\op{A}$, on wavefunctions. Each observable has an operator whose eigenvalues are the possible measurement results and whose eigenstates are the states in which the observable has a definite value. (Chapter 1)

Dirac delta function
: The 'function' $\delta(x)$ that vanishes everywhere except at $x=0$ and integrates to one, so that $\infint f(x)\delta(x - x_0)dx = f(x_0)$. It expresses the normalisation of the position and momentum states. (Chapter 1)

momentum wavefunction
: The function $\tilde\psi(p)$ that specifies the same state in terms of momentum, through $\ket{\psi} = \infint \tilde\psi(p)\ket{p}dp$. It is the Fourier transform of $\psi(x)$, and $|\tilde\psi(p)|^2$ is the probability density for the momentum. (Chapter 2)

plane wave
: The wavefunction $A e^{ipx/\hbar}$ of a particle with definite momentum $p$. It is a complex wave with wavelength $\lambda = h/p$, and its modulus is the same everywhere. (Chapter 2)

Fourier transform
: The pair of integrals that take $\psi(x)$ to $\tilde\psi(p)$ and back again, namely $\tilde\psi(p) = \frac{1}{\sqrt{2\pi\hbar}}\infint \psi(x) e^{-ipx/\hbar}dx$ and its inverse. (Chapter 2)

standard deviation
: The spread $\Delta x = \sqrt{\av{x^2} - \av{x}^2}$ of the results of repeated position measurements on identically prepared particles, and likewise $\Delta p$ for the momentum. It is what we mean by the uncertainty in a quantity. (Chapter 3)

commutator
: The operator $[\hat{A}, \hat{B}] = \hat{A}\hat{B} - \hat{B}\hat{A}$, which tells us whether the order in which two operators are applied matters. For position and momentum, $[\hat{X}, \hat{P}] = i\hbar$. (Chapter 3)

incompatible observables
: Two observables whose operators do not commute. They have no common eigenstates, and so a particle cannot have definite values of both at once. Position and momentum are the prime example. (Chapter 3)

Heisenberg uncertainty principle
: The statement that $\Delta x\,\Delta p \geq \hbar/2$ for every state, so that the spreads in position and in momentum cannot both be small. The Gaussian wavefunction saturates the bound. (Chapter 3)

Hamiltonian
: The operator $\hat{H} = \hat{P}^2/2M + V(\hat{X})$ for the total energy. Its eigenvalues are the allowed energies, and it generates the time evolution through the Schrödinger equation. (Chapter 4)

energy eigenstate
: A state $\ket{E}$ with $\hat{H}\ket{E} = E\ket{E}$, which therefore has the definite energy $E$. Its wavefunction $u_E(x)$ satisfies the time-independent Schrödinger equation. (Chapter 4)

time-independent Schrödinger equation
: The equation $-\frac{\hbar^2}{2M}\frac{d^2u}{dx^2} + V(x)u(x) = E\,u(x)$, abbreviated to the TISE. Its normalisable solutions are the energy eigenfunctions of a particle in the potential $V(x)$, and the values of $E$ for which such solutions exist are the allowed energies. (Chapter 4)

Schrödinger equation
: The equation of motion of quantum mechanics, $i\hbar \frac{d}{dt}\ket{\psi(t)} = \hat{H}\ket{\psi(t)}$, which determines the state at any later time from the state now. (Chapter 5)

stationary state
: Another name for an energy eigenstate, so called because under time evolution it only acquires the phase $e^{-iEt/\hbar}$. Its probability density, and indeed every measurable property, therefore stays constant in time. (Chapter 5)

wavepacket
: A localised wavefunction that is built from a range of momenta, such as the Gaussian $\psi(x) \propto e^{-x^2/4a^2}e^{ip_0x/\hbar}$. A free wavepacket moves at the classical speed $p_0/M$ and spreads as it goes. (Chapter 6)

infinite square well
: The potential that is zero for $0 \leq x \leq L$ and infinite outside this region. It is the simplest model of a particle confined to a region of space, and its allowed energies are $E_n = n^2\pi^2\hbar^2/2ML^2$. (Chapter 7)

quantum number
: The integer $n = 1, 2, 3, \dots$ (or $n = 0, 1, 2, \dots$ for the harmonic oscillator) that labels the energy levels and eigenfunctions of a bound particle. In three dimensions there is one quantum number for each dimension. (Chapter 7)

bound state
: An energy eigenstate whose wavefunction is normalisable and localised, as for the infinite square well and the harmonic oscillator. The energies of bound states are discrete. (Chapter 7)

ground state
: The energy eigenstate of lowest energy. Its energy lies above the minimum of the potential – the difference is the zero-point energy – as a consequence of the uncertainty principle. (Chapter 7)

creation and annihilation operators
: The pair of operators $\hat{a}^\dagger$ and $\hat{a}$ for the harmonic oscillator, which raise and lower the energy by one quantum $\hbar\omega$, so that $\hat{a}^\dagger\ket{E_n} \propto \ket{E_{n+1}}$ and $\hat{a}\ket{E_n} \propto \ket{E_{n-1}}$. All of the energy eigenstates can be generated from the ground state by repeatedly applying $\hat{a}^\dagger$. (Chapter 8)

tunnelling
: The fact that there is a non-zero probability of finding a quantum particle in a region where its energy is below the potential energy, which is forbidden classically. (Chapter 8)

reflection and transmission coefficients
: The probabilities $R$ and $T$ that a particle incident on a potential step (or barrier) is reflected or transmitted. Since one or the other must happen, $R + T = 1$. (Chapter 9)

degeneracy
: The situation in which several distinct energy eigenstates share the same energy. In three dimensions it arises from the symmetry of the potential, for example from the permutations of $(n_x, n_y, n_z)$ in a cubic box. (Chapter 11)
```
