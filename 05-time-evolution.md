---
title: "Chapter 5: Time evolution" 
short_title: "Ch. 5: Evolution"
numbering:
  enumerator: 5.%s
authors:
  - name: 
    affiliations:
---

We are now ready to embark on one of the central physical questions that we are interested in: *how do quantum particles evolve in time?* 

Up until now, we have just been discussing quantum states, and their **static** properties, without making any reference to time, or how the state changes in time. That is, when we have considered a particle with a state $\ket{\psi}$, we have really meant the state at some reference time, e.g. $t=0$. If we prepare a particle in some state, we don't expect it to **remain in that state**. For example, if the particle has momentum, we know it is moving, and so know its state should change, reflecting this non-zero momentum. 

In this chapter, after reintroducing the **equation of motion** of QM, we will see how writing a quantum state as a superposition of energy eigenstates allow us to **solve it directly** and **write down the state at time $t$**. 

## The Schrödinger Equation

In general, if we prepare a quantum particle in the state $\ket{\psi_\init}$ at time $t = 0$, we are interested in determining its state at an arbitrary later time $t$, which we will denote by $\ket{\psi(t)}$. 

The **equation of motion** in quantum physics called the Schrödinger Equation (SE), and is given by
````{card}
```{math}
:label: e-SE
i\hbar \frac{d}{dt}\ket{\psi(t)} = \hat{H}\ket{\psi(t)}.
```
```` 
If $\ket{\psi(t)}$ satisfies [](#e-SE) with the **initial condition** $\ket{\psi(0)} = \ket{\psi_\init}$, then this will be what the quantum state evolves into at time $t$. 

*What is the SE in terms of the wavefunction $\psi(x,t)$?* We can find this by expressing $\ket{\psi(t)}$ as in [](#e-general-quantum-state), and taking the scalar product with $\bra{x'}$. As an exercise, you will show that this leads to
````{card}
```{math}
\vph i\hbar \frac{\partial}{\partial t} \psi(x,t) = \op{H} \psi(x,t).
```
````
This is also referred to simply as the **Schrödinger Equation**, as it is the equation of motion, now for the wavefunction, rather than the quantum state. 
## Evolution of bound states

You saw how to solve the SE last year for a $d$-dimensional quantum system. When considering a quantum particle which is in a [**bound state**](#s-bound-states) — by which we mean **can be written as a superposition of energy eigenstates, all with energy $E<E_B$** (i.e. trapped within a potential well), then this same treatment carries over directly. 

In particular, let us assume that our initial state $\ket{\psi_\init}$ (at $t=0$) can be written as
```{math}
\ket{\psi_\init} = \sum_{k=1}^{d} \alpha_k \ket{E_k},
```
where we consider an arbitrary Hamiltonian $\hat{H}$, with a potential $\hat{V}$ such that there are $d$ bound energy eigenstates — that satisfy $\hat{H}\ket{E_k} = E_k \ket{E_k}$ with $E_k < E_B$, and $\sum_{k} |\alpha_k|^2 = 1$ so that $\ket{\psi_\init}$ is a normalised quantum state. 

Then, according to what you learnt last year, the quantum state at time $t$ will be
```{math}
:label: e:soln-to-SE-bound
\ket{\psi(t)} = \sum_{k=1}^d \alpha_k e^{-iE_k t/\hbar}\ket{E_k},
```
which we can directly see satisfies the initial condition $\ket{\psi(0)} = \ket{\psi_\init}$. We leave it as an exercise to confirm that [](#e:soln-to-SE-bound) solves the SE [](#e-SE).

Using [](#e-x-scalar), we can also see how the wavefunction evolves. In particular, the particle will have a wavefunction $\psi(x,t)$ at time $t$. The initial condition is that wavefunction is $\psi_\init(x) = \inner{x}{\psi_\init}$. Taking the scalar product with $\bra{x}$ on both sides of [](#e:soln-to-SE-bound), the wavefunction at time $t$ is given by
````{card}
```{math}
:label: e-wf-soln-to-SE-bound
\psi(x,t) = \sum_{k=1}^d \alpha_k e^{-iE_kt/\hbar} u_{E_k}(x),
```
````
where $u_{E_k}(x)$ are the energy eigenfunctions associated to the energy eigenstates $\ket{E_k}$ through [](#e-eigenstate-wf), which satisfy the TISE [](#e-TISE).

## Evolution of non-bound states

We now turn our attention to the evolution of [**non-bound**](#s-non-bound-states) states. By this, we mean that the particle **definitely has too much energy to be confined in the potential well**. More concretely, it means that we consider a situation where the initial state can be written as
```{math}
:label: e-init-non-bound
\ket{\psi_\init} = \int_{E_B}^\infty \phi_\init(E)\ket{E}dE,
```
where now, since energies are **continuous** for [non-bound state](#s-Non-bound-states), we have to integrate rather than sum to form a superposition, and where we have changed to $\phi_\init(E)$ (from $\alpha_k$), which is now a **function of energy**, just as the position and momentum wavefunctions are functions, respectively, of position and momentum. The lower limit on the integral of $E_B$ is because only in this **energy range** is the particle not bound to the well. 

Our goal now is to find the state $\ket{\psi(t)}$ which satisfies the SE [](#e-SE) and has [](#e-init-non-bound) as the initial condition. Let us **assume** that we can write $\ket{\psi(t)}$ in the same form as [](#e-init-non-bound), that is, in the form
```{math}
:label: e-non-bound-ansatze
\ket{\psi(t)} = \int_{E_B}^\infty \phi(E,t)\ket{E}dE,
```
for some function $\phi(E,t)$ that we want to determine. Subtituting this into the SE [](#e-SE), we find
```{math}
i\hbar \frac{d}{dt} \int_{E_B}^\infty \phi(E,t)\ket{E}dE &= \hat{H} \int_{E_B}^\infty \phi(E,t)\ket{E}dE,
```
We can take $\frac{d}{dt}$ inside the integral on the left-hand side, as long as we write it as $\frac{\partial}{\partial t}$ (since inside the integral, we have **both** the variables $t$ and $E$), and similarly we can take $\hat{H}$ inside the integral on the right-hand side, and use the fact that $\ket{E}$ is an energy eigenstate, satisfying [](#e-E-eigenvalue-eq), to arrive at
```{math}
i\hbar  \int_{E_B}^\infty \frac{\partial}{\partial t}\phi(E,t)\ket{E}dE &=  \int_{E_B}^\infty  \phi(E,t)E \ket{E}dE.
```
Finally, if we take the scalar product with $\bra{E'}$ on both sides, using [](#e-norm-non-bound-E) and [](#e-delta-defining-eq), we obtain
```{math}
\vph i\hbar  \frac{\partial}{\partial t}\phi(E',t) =   E'\phi(E',t).
```
This is however **the same differential equation you solved previously**. The solution is 
```{math}
\phi(E,t) = \phi_\init(E) e^{-iEt/\hbar}.
```
Substituting this back into [](#e-non-bound-ansatze), the final solution is 
```{math}
:label: e-non-bound-evolution
\ket{\psi(t)} = \int_{E_B}^\infty \phi_\init(E)e^{-iEt/\hbar}\ket{E}dE,
```
which we can readily confirm satisfies the initial condition $\ket{\psi(0)} = \ket{\psi_\init}$, as required. In terms of wavefunctions, we have
````{card}
```{math}
:label: e-wf-soln-to-SE-non-bound
\psi(x,t) = \int_{E_B}^\infty \phi_\init(E)e^{-iEt/\hbar}u_E(x)dE.
```
````
(s-stationary)=
## Stationary states

Let us return for the moment to bound states, and consider a particularly simple initial condition: that the particle has a definite energy $E_\ell$. That is, the initial state is $\ket{\psi_\init} = \ket{E_\ell}$, and so $\alpha_\ell = 1$ and $\alpha_k = 0$ for $k \neq \ell$. According to [](#e:soln-to-SE-bound) the quantum state at time $t$ will be
```{math}
\ket{\psi(t)} = e^{-iE_\ell t/\hbar}\ket{E_\ell}.
```
That is, **in time, the state just aquires a *phase* $e^{-i E_\ell t/\hbar}$**. What we would now like to ask is *what properties of the particle change?*

First of all, we can see that the **energy hasn't changed**. In particular, the particle started off with a definite energy $E_\ell$. While it has aquired a phase, **this doesn't change the energy of the particle**. One way to see this is to consider **measuring the energy**. Recall that if we had a general superposition of energy levels, $\sum_k \beta_k \ket{E_k}$, then the probability of the result $E_k$ would be 
```{math}
\prob(E_k) = |\beta_k|^2.
``` 
Here we have $\beta_\ell = e^{-iE_\ell t/\hbar}$ (and $\beta_k = 0$ for $k \neq \ell$). So
```{math}
\prob(E_\ell) = |e^{-iE_\ell t/\hbar}|^2 = 1.
``` 

This is in fact what we know really **must** have been the case, since **energy is a conserved quantity** which **should not change in time**. If quantum mechanics would have predicted that the energy of a particle would change in time, then this would truly be a radical departure from classical physics! Luckily this isn't the case. 

*What about the position of the particle. Does this change in time?* From [](#e-wf-soln-to-SE-bound), we see that here
```{math}
\psi(x,t) = e^{-iE_\ell t/\hbar} u_{E_\ell}(x),
```
where $u_{E_\ell}(x)$ is the wavefunction associated to the quantum state $\ket{E_\ell}$. If we measure the position of the particle at time $t$, the probability density to find it at $x$ is
```{math}
\pd(x,t) &= |\psi(x,t)|^2,\\
&= |e^{-iE_\ell t/\hbar} u_{E_\ell}(x)|^2,\\
&= |u_{E_\ell}(x)|^2,
```
which is **independent of time**. Therefore, no matter at what time we choose to measure the position of the particle, we obtain the same probabilities to find it in any given region. We thus see that **the particle is not moving**. 

We reach a similar conclusion about the momentum, which we leave as an exercise. Namely, we find that the probability density for the particle to have momentum $p$ at time $t$ is also time-independent. 

In fact, **none of the physical properties of the particle change**! For this reason, we call energy eigenstates **stationary states**. The simple evolution of aquiring a phase doesn't change any property of the state. 

This follows from a more fundamental property of quantum mechanics:

```{card}
> The states $\ket{\psi}$ and $e^{i\theta}\ket{\psi}$ lead to identical physical predictions in all situations.  
```
In our example, the only difference in the quantum state of a particle with a definite energy $E_\ell$ between $t = 0$ and time $t$ is precisely a phase factor $e^{-i E_\ell t/\hbar}$. while this phase **changes in time**, it is a phase nevertheless, and hence the physical predictions are identical at all times.  

## Evolution of superpositions

We now want to return to the 'big picture' of time evolution in quantum mechanics, and see how we can **understand** [](#e-wf-soln-to-SE-bound) and [](#e-wf-soln-to-SE-non-bound). The key is to realise that these are **special cases** of a more general lesson about quantum evolution, known as the **superposition principle**. 

To understand what this is, we need to consider **two separate initial conditions**, $\psi_\init(x)$ and $\psi_\init'(x)$ (specified in terms of wavefunctions, rather than quantum states, although the two are equivalent). Let's assume that in each case, we have found the corresponding time evolution $\psi(x,t)$ and $\psi'(x,t)$ (as given through [](#e-wf-soln-to-SE-bound) or [](#e-wf-soln-to-SE-non-bound)). 

Now, the question is, *what would happen if we considered a third initial condition, which is a **superposition** of the above two initial conditions?* That is, how does the wavefunction 
```{math}
\psi_\init''(x) = \beta \psi_\init(x) + \gamma \psi_\init'(x),
```
evolve in time, where $\beta$ and $\gamma$ are arbitrary complex numbers, such that $\psi_\init''(x)$ is a normalised wavefunction. 

The crucial insight is that **we can write down the answer immediately** because of the **superposition principle**, which states that

> The evolution of a superposition is just the superposition of evolutions.

That is, since $\psi_\init''(x)$ is a superposition of $\psi_\init(x)$ and $\psi_\init'(x)$, and since we already know that $\psi_\init(x)$ evolves into $\psi(x,t)$ and $\psi'_\init(x)$ evolves into $\psi'(x,t)$, we are guaranteed that $\psi_\init''(x)$ evolves into the superposition of $\psi'_\init(x)$ and $\psi'(x,t)$. Namely, into
```{math}
\psi''(x,t) = \beta \psi(x,t) + \gamma \psi'(x,t).
```
This is very special, and **remarkably powerful**. You will show that it is true as an exercise. 

We can now return to [](#e-wf-soln-to-SE-bound) and use the superposition principle to understand (and therefore hopefully remember!) it. We wrote the initial wavefunction as a **superposition** of energy eigenfunctions. Each energy eigenfunction evolves in a **simple** fashion, as we saw in [](#s-stationary): it only aquires a phase factor $e^{-iE_k t/\hbar}$ in time. [](#e-wf-soln-to-SE-bound) is then nothing but an application of the superposition principle: the evolution of the superposition is just the superposition of the **simple** evolutions! It is worthwhile taking time to internalise this, as it is one of the most important lessons about quantum mechanics. 

The same story is also true for [](#e-wf-soln-to-SE-non-bound), the only difference now is the form of the superposition (going from a discrete sum, to a continuous integral). 

We thus arrive at a rather important realisation: quantum mechanical evolution is actually very simple: energy eigenstates evolve in very simple ways. We will nevertheless see that quantum mechanical evolution **appears complex**. Where does this complexity come from? It comes from **interference**, and the fact that in a superposition, we take **complex** multiples of energy eigenstates. 

This is in fact similar to what we see in many situations, for example when considering **waves on a string**, or **coupled oscillators**. The motion is complex, but there are **modes** which evolve in simple ways, and the complex motion comes merely from interference between modes. The situation is similar in quantum mechanics, the only real distinction being the introduction of complex numbers, allowing for more interesting forms of interference. 